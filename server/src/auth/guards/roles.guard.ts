import {
  BadRequestException,
  CanActivate,
  ExecutionContext,
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { Role } from '../../entities/wings/enums/participate-role';
import { RequestUser } from '../types/request-user.type';
import { AllowedRole } from '../decorators/allowed-role.decorator';

/** @class RolesGuard
 * Manages permission control in the route by checkin the user's roles and
 * their membership in specific wings.
 * */
@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const allowedRole = this.reflector.get<Role>(
      AllowedRole,
      context.getHandler(),
    );

    if (!allowedRole) {
      throw new InternalServerErrorException(
        'No role was specified for the guard.',
      );
    }

    const request = context.switchToHttp().getRequest();
    const user = request.user as RequestUser;

    if (!user) {
      throw new UnauthorizedException();
    }

    const wingId = request.body.wingId;
    if (!wingId) {
      throw new BadRequestException('No wing was specified.');
    }

    const wingMembership = user.wingMemberships.find(
      (wm) => wm.wing.id == wingId,
    );

    const roleInWing = wingMembership.role;

    if (allowedRole == Role.Harmony) {
      return (
        wingMembership &&
        (roleInWing == allowedRole || roleInWing == Role.WingChief)
      );
    }

    return roleInWing == allowedRole;
  }
}
