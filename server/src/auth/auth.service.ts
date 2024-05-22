import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../entities/users/users.service';
import { HashingService } from '../common/hashing/hashing.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private hashingService: HashingService,
    private jwtService: JwtService,
  ) {}

  async login(email: string, password: string) {
    const user = await this.userService.findByEmail(email);
    if (!user) {
      throw new UnauthorizedException('invalid email and/or password');
    }

    const correctPassword = this.hashingService.compareData(
      password,
      user.password,
    );

    if (!correctPassword) {
      throw new UnauthorizedException('invalid email and/or password');
    }

    const payload = { sub: user.id };

    return await this.jwtService.signAsync(payload);
  }
}
