import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Wing } from './wing.entity';
import { WingsService } from './wings.service';
import { WingsController } from './wings.controller';
import { WingsValidator } from './validators/wings.validator';
import { UsersModule } from '../users/users.module';
import { WingMembership } from './wing-membership.entity';
import { WingMembershipService } from './wing-membership.service';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    TypeOrmModule.forFeature([Wing, WingMembership]),
    UsersModule,
    ConfigModule,
  ],
  controllers: [WingsController],
  providers: [
    WingsValidator,
    WingsService,
    WingMembershipService,
    WingsController,
  ],
  exports: [WingsService, WingMembershipService],
})
export class WingsModule {}
