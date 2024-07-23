import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { Role } from './enums/participate-role';
import { AllowedRole } from '../../auth/decorators/allowed-role.decorator';
import { RolesGuard } from '../../auth/guards/roles.guard';
import { WingMembershipService } from './wing-membership.service';
import { CreateInviteCodeDto } from './dtos/create-invite-code.dto';
import { UsersFromWingDto } from './dtos/users-from-wing.dto';
import { CurrentUser } from '../../auth/decorators/current-user.decorator';
import { RequestUser } from '../../auth/types/request-user.type';

@Controller('wing-membership')
export class WingMembershipController {
  // TODO Leave wing
  // TODO Change user permission in the wing

  constructor(private readonly wingMembershipService: WingMembershipService) {}

  @Post('generate-invite')
  @AllowedRole(Role.Harmony)
  @UseGuards(RolesGuard)
  public async generateInvite(@Body() body: CreateInviteCodeDto) {
    const token = await this.wingMembershipService.generateInviteCode(body);

    return { token };
  }

  @Post('join-invite')
  public async joinInvite(
    @Param() token: string,
    @CurrentUser() currentUser: RequestUser,
  ) {
    const wing = await this.wingMembershipService.validateInvite(token);
    return await this.wingMembershipService.addUserToWing(
      currentUser,
      wing,
      Role.Component,
    );
  }

  @Get('validate-invite')
  public async validateInvite(@Param() token: string) {
    const wing = await this.wingMembershipService.validateInvite(token);
    return { wingId: wing.id, wingName: wing.name };
  }

  @Get('wing-users')
  public async getUsers(@Body() body: UsersFromWingDto) {
    console.log(body);
    const wingUsers = await this.wingMembershipService.getAllUsersForWing(
      body.wingId,
    );
    let usersData = [];
    wingUsers.forEach((wingUser) => {
      usersData.push({
        name: wingUser.user.firstName + ' ' + wingUser.user.lastName,
        role: wingUser.role,
      });
    });
    return usersData;
  }
}
