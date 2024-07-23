import { Module } from '@nestjs/common';
import { WingGridController } from './wing-grid.controller';
import { WingGridService } from './wing-grid.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WingGrid } from './wing-grid.entity';
import { WingGridValidator } from './validators/wing-grid.validator';
import { Wing } from '../wings/wing.entity';
import { WingsModule } from '../wings/wings.module';
import { WingMembership } from '../wings/wing-membership.entity';
import { UsersModule } from '../users/users.module';
import { User } from '../users/user.entity';
import { GridCell } from './grid-cell.entity';
import { Friendship } from '../friendships/friendship.entity';
import { FriendshipsModule } from '../friendships/friendships.module';
import { HashingModule } from '../../common/hashing/hashing.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      GridCell,
      WingGrid,
      Wing,
      WingMembership,
      User,
      Friendship,
    ]),
    WingsModule,
    UsersModule,
    FriendshipsModule,
  ],
  controllers: [WingGridController],
  providers: [WingGridService, WingGridValidator],
  exports: [WingGridService],
})
export class WingGridModule {}
