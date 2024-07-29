import {Body, Controller, Get, Param, Post, UseGuards} from "@nestjs/common";
import {Role} from "./enums/participate-role";
import {AllowedRole} from "../../auth/decorators/allowed-role.decorator";
import {RolesGuard} from "../../auth/guards/roles.guard";
import {WingMembershipService} from "./wing-membership.service";
import {CreateInviteCodeDto} from "./dtos/create-invite-code.dto";
import {CurrentUser} from "../../auth/decorators/current-user.decorator";
import {RequestUser} from "../../auth/types/request-user.type";

@Controller("wing-membership")
export class WingMembershipController {
    // TODO Leave wing
    // TODO Change user permission in the wing

    constructor(private readonly wingMembershipService: WingMembershipService) {
    }

    @Post("generate-invite")
    @AllowedRole(Role.Harmony)
    @UseGuards(RolesGuard)
    public async generateInvite(@Body() body: CreateInviteCodeDto) {
        const token = await this.wingMembershipService.generateInviteCode(body);

        return {token};
    }

    @Post("join-invite")
    public async joinInvite(
        @Body() body: { token: string },
        @CurrentUser() currentUser: RequestUser,
    ) {
        const wing = await this.wingMembershipService.validateInvite(body.token);
        return await this.wingMembershipService.addUserToWing(
            currentUser,
            wing,
            Role.Component,
        );
    }

    @Get("validate-invite/:token")
    public async validateInvite(@Param("token") token: string) {
        const wing = await this.wingMembershipService.validateInvite(token);
        return {id: wing.id, name: wing.name};
    }

    @Get("get-wings")
    public async getWings(@CurrentUser() currentUser: RequestUser) {
        return await this.wingMembershipService.getWingsForUser(currentUser);
    }

    @Get("wing-users/:wingId")
    public async getUsers(@Param("wingId") wingId: number, @CurrentUser() user: RequestUser) {
        return await this.wingMembershipService.getWingMembers(wingId, user);
    }
}
