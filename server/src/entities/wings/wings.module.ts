import { Logger, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Wing } from './wing.entity';
import { WingsService } from './wings.service';
import { WingsController } from './wings.controller';
import { WingsValidator } from './validators/wings.validator';
import { UsersModule } from '../users/users.module';
import { WingMembership } from './wing-membership.entity';
import { WingMembershipService } from './wing-membership.service';
import { ConfigModule } from '@nestjs/config';
import { Invite } from './invite.entity';
import { WingMembershipController } from './wing-membership.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([Wing, WingMembership, Invite]),
    UsersModule,
    ConfigModule,
  ],
  controllers: [WingsController, WingMembershipController],
  providers: [WingsValidator, WingsService, WingMembershipService, Logger],
  exports: [WingsService, WingMembershipService],
})
export class WingsModule {}
