import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from '../entities/users/users.module';
import { WingsModule } from '../entities/wings/wings.module';
import { HashingModule } from '../common/hashing/hashing.module';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import AccessTokenStrategy from './strategies/access-token.strategy';
import Token from './token.entity';
import RefreshTokenStrategy from './strategies/refresh-token.strategy';
import { RolesGuard } from './guards/roles.guard';

@Module({
  imports: [
    UsersModule,
    WingsModule,
    HashingModule,
    JwtModule.register({}),
    TypeOrmModule.forFeature([Token]),
  ],
  providers: [
    AuthService,
    AccessTokenStrategy,
    RefreshTokenStrategy,
    RolesGuard,
  ],
  controllers: [AuthController],
})
export class AuthModule {}
