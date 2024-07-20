import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { Role } from './enums/participate-role';
import { AllowedRole } from '../../auth/decorators/allowed-role.decorator';
import { RolesGuard } from '../../auth/guards/roles.guard';
import { WingMembershipService } from './wing-membership.service';
import { CreateInviteCodeDto } from './dtos/create-invite-code.dto';
import { ConfigService } from '@nestjs/config';
import { CurrentUser } from '../../auth/decorators/current-user.decorator';
import { RequestUser } from '../../auth/types/request-user.type';

@Controller('wing-membership')
export class WingMembershipController {
  // TODO Leave wing
  // TODO Change user permission in the wing

  constructor(
    private readonly wingMembershipService: WingMembershipService,
    private readonly configService: ConfigService,
  ) {}

  @Post('generate-invite')
  @AllowedRole(Role.Harmony)
  @UseGuards(RolesGuard)
  public async generateInvite(@Body() body: CreateInviteCodeDto) {
    const token = await this.wingMembershipService.generateInviteCode(body);

    return { token };
  }

  @Get('join-invite')
  public async joinInvite(
    @Param() token: string,
    @CurrentUser() currentUser: RequestUser,
  ) {}
}
