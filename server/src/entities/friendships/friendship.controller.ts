import { Body, Controller, Get, Post } from '@nestjs/common';
import { CreateFriendshipDto } from './dto/create-friendship.dto';
import { FriendshipsService } from './friendships.service';
import { CurrentUser } from '../../auth/decorators/current-user.decorator';
import { RequestUser } from '../../auth/types/request-user.type';
import { AcceptFriendshipDto } from './dto/accept-friendship.dto';

/**
 * @class FriendshipController
 * Controller for managing friendship-related actions.
 * */

@Controller('friendship')
export class FriendshipController {
  constructor(private readonly friendshipService: FriendshipsService) {}

  @Post('create')
  public async create(
    @Body() body: CreateFriendshipDto,
    @CurrentUser() currentUser: RequestUser,
  ) {
    return this.friendshipService.sendFriendRequest(
      body.receiverId,
      currentUser,
    );
  }
  // TODO: e2e test for creating requests. Optionally, unit tests.

  @Post('accept-request')
  public async acceptRequest(
    @Body() body: AcceptFriendshipDto,
    @CurrentUser() currentUser: RequestUser,
  ) {
    return this.friendshipService.acceptFriendRequest(
      body.requestId,
      currentUser,
    );
  }
  // TODO: e2e test. Optionally, unit tests.

  @Get('pending-friends')
  public async pendingFriends(@CurrentUser() currentUser: RequestUser) {
    return await this.friendshipService.getAllPendingReceivedRequests(
      currentUser,
    );
  }
  // TODO: e2e test. Optionally, unit tests.

  @Get('friends-list')
  public async friendsList(@CurrentUser() currentUser: RequestUser) {
    return this.friendshipService.getAllFriends(currentUser);
  }
  // TODO: e2e test. Optionally, unit tests.
}
