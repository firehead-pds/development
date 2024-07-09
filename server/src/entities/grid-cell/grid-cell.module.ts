import { Module } from '@nestjs/common';
import { GridCellService } from './grid-cell.service';
import { GridCellController } from './grid-cell.controller';

@Module({
  providers: [GridCellService],
  controllers: [GridCellController]
})
export class GridCellModule {}
