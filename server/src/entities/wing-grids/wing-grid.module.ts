import { Module } from '@nestjs/common';
import { WingGridController } from './wing-grid.controller';
import { WingGridService } from './wing-grid.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WingGrid } from './wing-grid.entity';
import { WingGridValidator } from './validators/wing-grid.validator';
import { Wing } from '../wings/wing.entity';
import { WingsModule } from '../wings/wings.module';
import { WingMembership } from '../wings/wing-membership.entity';
import { WingMembershipService } from '../wings/wing-membership.service';
import { GridCell } from '../grid-cell/grid-cell.entity';
import { GridCellService } from '../grid-cell/grid-cell.service';
import { UsersService } from '../users/users.service';
import { UsersModule } from '../users/users.module';
import { User } from '../users/user.entity';
import { UsersValidator } from '../users/validators/users.validator';
import { HashingModule } from '../../common/hashing/hashing.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([GridCell, WingGrid, Wing, WingMembership, User]),
    WingsModule,
    UsersModule,
    HashingModule,
  ],
  controllers: [WingGridController],
  providers: [
    WingGridService,
    GridCellService,
    WingMembershipService,
    WingGridValidator,
    UsersService,
    UsersValidator,
  ],
  exports: [WingGridService],
})
export class WingGridModule {}
