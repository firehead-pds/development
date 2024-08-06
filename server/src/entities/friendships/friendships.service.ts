import {
  BadRequestException,
  ConflictException,
  ForbiddenException,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Friendship } from './friendship.entity';
import { Repository } from 'typeorm';
import { User } from '../users/user.entity';
import { UsersService } from '../users/users.service';
import { FriendRequestStatus } from './enums/friend-request-status';

/**
 * @class FriendshipsService
 * Manages friendship-related actions, including friend requests and responses, and
 * a user's friends list.
 * */
@Injectable()
export class FriendshipsService {
  constructor(
    @InjectRepository(Friendship)
    private friendshipRepo: Repository<Friendship>,
    private usersService: UsersService,
  ) {}

  /**
   * Finds a friend request by ID.
   *
   * @param creator The information of the friend request creator.
   * @param receiver The information of the friend request receiver.
   * @returns A friend request with the ID provided by the parameter.
   */
  private async findOneReceivedFriendRequest(creator: User, receiver: User) {
    return await this.friendshipRepo.findOne({
      relations: {
        receiver: true,
      },
      where: {
        creator: creator,
        receiver: receiver,
      },
    });
  }

  private async findOneFriendRequest(friend: User, user: User) {
    return await this.friendshipRepo.findOneBy([
      {
        creator: friend,
        receiver: user,
      },
      {
        creator: user,
        receiver: friend,
      },
    ]);
  }

  /**
   * Creates a friend request, sending a friend request to a specific user.
   *
   * @param receiverId The ID of the friend request receiver.
   * @param creator The information of the friend request creator.
   * @throws BadRequestException If the user tried to send a friend request to themselves.
   * @throws ConflictException If the user has already sent a friend request to the specified user.
   * @returns The new friend request ID.
   */
  public async sendFriendRequest(receiverId: number, creator: User) {
    if (receiverId === creator.id) {
      throw new BadRequestException(
        'it is not possible to add yourself as a friend',
      );
    }
    const receiver = await this.usersService.findOneById(receiverId);
    const requestAlreadyExists = await this.requestAlreadyExists(
      creator,
      receiver,
    );
    if (requestAlreadyExists) {
      throw new ConflictException(
        'a friend request has already been sent to or received by this user',
      );
    }

    const friendRequest = this.friendshipRepo.create({
      creator,
      receiver,
      status: FriendRequestStatus.PENDING,
    });
    await this.friendshipRepo.save(friendRequest);

    /*
    Friendship ID being returned.
    */
    return { id: friendRequest.id };
  }

  /**
   * Accepts a friend request received by a specific user.
   *
   * @param friendRequestId The friend request ID.
   * @param receiver The information of the friend request receiver.
   * @throws NotFoundException If friend request with the provided ID does not exist.
   * @throws ConflictException If the user has already accepted a friend request with the provided ID.
   * @throws ForbiddenException If the user trying to accept the friend request is not the same as the user who received the friend request.
   * @returns The friend request with ACCEPTED status.
   */
  public async acceptFriendRequest(friendRequestId: number, receiver: User) {
    const creator = await this.usersService.findOneById(friendRequestId);
    const friendRequest = await this.findOneReceivedFriendRequest(
      creator,
      receiver,
    );

    if (!friendRequest) {
      throw new NotFoundException('no requests found with given id');
    }

    if (friendRequest.status === FriendRequestStatus.ACCEPTED) {
      throw new ConflictException(
        'this friend request has already been accepted',
      );
    }

    if (friendRequest.receiver.id != receiver.id) {
      throw new ForbiddenException(
        'the user trying to accept and the user who received the friend request are not the same',
      );
    }

    friendRequest.status = FriendRequestStatus.ACCEPTED;
    return await this.friendshipRepo.save(friendRequest);
  }

  public async deleteFriendRequest(friendId: number, currentUser: User) {
    const friendUser = await this.usersService.findOneById(friendId);
    const friendRequest = await this.findOneFriendRequest(
      friendUser,
      currentUser,
    );

    if (!friendRequest) {
      throw new NotFoundException("friendship doens't exist");
    }

    if (friendRequest.status !== FriendRequestStatus.ACCEPTED) {
      throw new ConflictException('no friendship between the users');
    }
    return await this.friendshipRepo.delete(friendRequest);
  }

  /**
   * Get all friends of a specific user.
   *
   * @param currentUser The user to get the friends for.
   * @returns A list of all the user's friends.
   */
  public async getAllFriends(currentUser: User) {
    const friendships = await this.getAllFriendshipRecords(currentUser);

    let friendIds: number[] = [];

    /*
    Check if the current user created or received the friend request.
    If they are the creator, add the ID of the receiver as the friend.
    Otherwise, add the ID of the creator as the friend.
    */

    friendships.forEach((friend) => {
      if (friend.creator.id === currentUser.id) {
        friendIds.push(friend.receiver.id);
      } else if (friend.receiver.id === currentUser.id) {
        friendIds.push(friend.creator.id);
      }
    });

    const friends = await this.usersService.findManyByIds(friendIds);
    Logger.log(`The found friends:${friends}`);
    return friends;
  }

  /**
   * Get all friendships for a specific user.
   *
   * @param user The user who is trying to see all their friendships.
   * @returns A list of all friendships of the user.
   */
  private async getAllFriendshipRecords(user: User) {
    return await this.friendshipRepo.find({
      relations: {
        creator: true,
        receiver: true,
      },
      where: [
        /*
        The user can be the one who created or the one who received the friend request.
        Either way, it is still a friend if it has been accepted, so we need to check for both.
        */
        {
          creator: user,
          status: FriendRequestStatus.ACCEPTED,
        },
        {
          receiver: user,
          status: FriendRequestStatus.ACCEPTED,
        },
      ],
    });
  }

  /**
   * Get all pending received friend requests for a specific user.
   *
   * @param user The user who is trying to see all their pending friend requests.
   * @returns A list of all the user's pending friend requests.
   */
  public async getAllPendingReceivedRequests(user: User) {
    return await this.friendshipRepo.find({
      where: [
        {
          receiver: user,
          status: FriendRequestStatus.PENDING,
        },
      ],
    });
  }

  /**
   * Check if there is already a friend request between two users.
   *
   * @param creator The user who created the friend request.
   * @param receiver The user who received the friend request.
   * @returns 1 if there is already a friend request between the two users, nothing otherwise.
   */
  private async requestAlreadyExists(creator: User, receiver: User) {
    const friendRequest = await this.friendshipRepo.find({
      where: [
        /*
        Check if it has been either received or created.
        */
        { creator, receiver },
        { creator: receiver, receiver: creator },
      ],
    });
    return friendRequest.length !== 0;
  }
}
