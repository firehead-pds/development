import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Friendship } from './friendship.entity';
import { Repository } from 'typeorm';
import { User } from '../users/user.entity';
import { UsersService } from '../users/users.service';
import { FriendRequestStatus } from './enums/friend-request-status';

@Injectable()
export class FriendshipsService {
  constructor(
    @InjectRepository(Friendship)
    private friendshipRepo: Repository<Friendship>,
    private usersService: UsersService,
  ) {}

  private async findFriendRequestById(id: number) {
    return await this.friendshipRepo.findOneBy({ id });
  }

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

    const friendRequest: Partial<Friendship> = {
      creator,
      receiver,
      status: FriendRequestStatus.PENDING,
    };

    return this.friendshipRepo.create(friendRequest);
  }

  public async acceptFriendRequest(friendRequestId: number) {
    const friendRequest = await this.findFriendRequestById(friendRequestId);
    if (!friendRequest) {
      throw new NotFoundException('no requests found with giver id');
    }

    if (friendRequest.status === 'accepted') {
      throw new ConflictException(
        'this friend request has already been accepted',
      );
    }

    friendRequest.status = FriendRequestStatus.ACCEPTED;

    return await this.friendshipRepo.save(friendRequest);
  }

  public async getAllFriends(currentUser: User) {
    const friendships = await this.getAllFriendshipRecords(currentUser);

    let friendIds: number[] = [];

    friendships.forEach((friend) => {
      if (friend.creator.id === currentUser.id) {
        friendIds.push(friend.receiver.id);
      } else if (friend.receiver.id === currentUser.id) {
        friendIds.push(friend.creator.id);
      }
    });

    return this.usersService.findManyByIds(friendIds);
  }

  private async getAllFriendshipRecords(user: User) {
    return await this.friendshipRepo.find({
      where: [
        // The user can be the one who created or the one who received the friend request
        // Either way, it is still a friend if it has been accepted, so we need to check for both
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

  private async requestAlreadyExists(creator: User, receiver: User) {
    const friendRequest = await this.friendshipRepo.find({
      where: [
        // Check if it has been either received or created
        { creator, receiver },
        { creator: receiver, receiver: creator },
      ],
    });
    return friendRequest.length !== 0;
  }
}
