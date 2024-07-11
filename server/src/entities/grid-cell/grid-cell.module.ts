import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GridCell } from './grid-cell.entity';
import { GridCellController } from './grid-cell.controller';
import { GridCellService } from './grid-cell.service';

@Module({
  imports: [TypeOrmModule.forFeature([GridCell])],
  controllers: [GridCellController],
  providers: [GridCellService],
})
export class GridCellModule {}
