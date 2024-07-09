import { Module } from '@nestjs/common';
import { WingGridController } from './wing-grid.controller';
import { WingGridService } from './wing-grid.service';

@Module({
  controllers: [WingGridController],
  providers: [WingGridService]
})
export class WingGridModule {}
