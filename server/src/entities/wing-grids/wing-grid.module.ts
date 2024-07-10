import { Module } from '@nestjs/common';
import { WingGridController } from './wing-grid.controller';
import { WingGridService } from './wing-grid.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WingGrid } from './wing-grid.entity';
import { WingGridValidator } from './validators/wing-grid.validator';

@Module({
  imports: [TypeOrmModule.forFeature([WingGrid])],
  controllers: [WingGridController],
  providers: [WingGridService, WingGridValidator],
  exports: [WingGridService],
})
export class WingGridModule {}
