import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { UsersService } from '../../entities/users/users.service';
import { JwtPayload } from '../types/jwt-payload.type';
import { FastifyRequest } from 'fastify';

@Injectable()
export default class AccessTokenStrategy extends PassportStrategy(
  Strategy,
  'access-token',
) {
  constructor(private usersService: UsersService) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        (req: FastifyRequest) => {
          return req.cookies.accessToken;
        },
      ]),
      secretOrKey: process.env.AT_SECRET,
    });
  }

  async validate(payload: JwtPayload) {
    const user = await this.usersService.findOneById(payload.sub);
    if (!user) {
      throw new UnauthorizedException('User not found');
    }
    return user;
  }
}
