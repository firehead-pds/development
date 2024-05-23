import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../entities/users/users.service';
import { HashingService } from '../common/hashing/hashing.service';
import { JwtService } from '@nestjs/jwt';
import { User } from '../entities/users/user.entity';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import Token from './token.entity';
import { Tokens } from './types/tokens.type';
import { v4 } from 'uuid';

@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private hashingService: HashingService,
    private jwtService: JwtService,
    private configService: ConfigService,
    @InjectRepository(Token) private tokenRepo: Repository<Token>,
  ) {}

  async signInLocal(email: string, password: string): Promise<Tokens> {
    const user = await this.userService.findByEmail(email);
    if (!user) {
      throw new UnauthorizedException('invalid email and/or password');
    }

    const passwordMatches = await this.hashingService.compareData(
      password,
      user.password,
    );

    if (!passwordMatches) {
      throw new UnauthorizedException('invalid email and/or password');
    }

    return await this.generateTokens(user);
  }

  async refreshTokens(user: User, tokenId: string): Promise<Tokens> {
    const token = await this.tokenRepo.findOneBy({
      tokenId,
    });

    if (!token) {
      throw new UnauthorizedException('refresh token not found');
    }

    await this.tokenRepo.remove(token);

    await this.generateTokens(user);
    return;
  }

  private async storeRefreshToken(user: User, tokenId: string) {
    const token = this.tokenRepo.create({
      tokenId,
      user,
    });

    await this.tokenRepo.save(token);
    return;
  }

  private async generateTokens(user: User): Promise<Tokens> {
    const jwtPayload = { sub: user.id, email: user.email };
    const tokenId = v4();

    const accessToken = await this.jwtService.signAsync(jwtPayload, {
      secret: this.configService.get<string>('AT_SECRET'),
      expiresIn: '15m',
    });

    const refreshToken = await this.jwtService.signAsync(
      { ...jwtPayload, tokenId },
      {
        secret: this.configService.get<string>('RT_SECRET'),
        expiresIn: '7d',
      },
    );

    await this.storeRefreshToken(user, tokenId);

    return { accessToken, refreshToken };
  }
}