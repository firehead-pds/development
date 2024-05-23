import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from '../entities/users/users.module';
import { HashingModule } from '../common/hashing/hashing.module';
import { JwtModule } from '@nestjs/jwt';
import AccessTokenStrategy from './strategies/access-token.strategy';
import { TypeOrmModule } from '@nestjs/typeorm';
import Token from './token.entity';
import RefreshTokenStrategy from './strategies/refresh-token.strategy';

@Module({
  imports: [
    UsersModule,
    HashingModule,
    JwtModule.register({}),
    TypeOrmModule.forFeature([Token]),
  ],
  providers: [AuthService, AccessTokenStrategy, RefreshTokenStrategy],
  controllers: [AuthController],
})
export class AuthModule {}
