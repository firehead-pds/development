import { Body, Controller, Post } from '@nestjs/common';
import { WingsService } from './wings.service';
import { ApiCreatedResponse } from '@nestjs/swagger';
import { WingDto } from './dtos/wing.dto';
import { CurrentUser } from '../../auth/decorators/current-user.decorator';
import { RequestUser } from '../../auth/types/request-user.type';

@Controller('wing')
export class WingsController {
  constructor(private readonly wingService: WingsService) {}

  @ApiCreatedResponse({ description: 'Wing created successfully' })
  @Post('create')
  public async create(
    @Body() body: WingDto,
    @CurrentUser() currentUser: RequestUser,
  ) {
    return this.wingService.create(body, currentUser);
  }
}
