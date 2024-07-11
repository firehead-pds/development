import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { GridCell } from './grid-cell.entity';
import { CreateGridCellDto } from './dto/create-grid-cell.dto';

@Injectable()
export class GridCellService {
  constructor(
    @InjectRepository(GridCell) private readonly repo: Repository<GridCell>,
  ) {}
  public async create(gridCellDto: CreateGridCellDto) {
    const newGridCell = this.repo.create(gridCellDto);
    console.log(newGridCell);
    await this.repo.save(newGridCell);
  }
}
