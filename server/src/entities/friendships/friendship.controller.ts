import { Body, Controller, Post } from '@nestjs/common';
import { CreateFriendshipDto } from './dto/create-friendship.dto';
import { FriendshipsService } from './friendships.service';
import { CurrentUser } from '../../auth/decorators/current-user.decorator';
import { RequestUser } from '../../auth/types/request-user.type';

/**
 * @class FriendshipController
 * Controller for managing friendship-related actions.
 * */
@Controller('friendship')
export class FriendshipController {
  constructor(private readonly friendshipService: FriendshipsService) {}

  @Post('friendship/create')
  public async create(
    @Body() body: CreateFriendshipDto,
    @CurrentUser() currentUser: RequestUser,
  ) {
    // TODO: Return just a success message or the created friendship ID. DO NOT return the result from the save method.
    return this.friendshipService.sendFriendRequest(
      body.receiverId,
      currentUser,
    );
  }
}

// Change service class as needed
// If possible, create the documentation with JSDoc
// TODO: Create friend request. Just make sure method above properly works at this point.
// TODO:e2e test for creating requests. Optionally, unit tests.

// TODO: Get all pending friend requests for the current user
// TODO:e2e test. Optionally, unit tests.

// TODO: Let current user accept a friend request
// TODO:e2e test. Optionally, unit tests.

// TODO: Get all friends for the current user.
// TODO:e2e test. Optionally, unit tests.
