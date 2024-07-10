import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { WingGrid } from './wing-grid.entity';
import { WingGridValidator } from './validators/wing-grid.validator';

@Injectable()
export class WingGridService {
  constructor(
    @InjectRepository(WingGrid) private readonly repo: Repository<WingGrid>,
    private readonly validator: WingGridValidator,
  ) {}

  public async create(wingGrid: Partial<WingGrid>) {
    await this.validator.validateCreateWingGrid(wingGrid);
    console.log('b');
    const newWingGrid = this.repo.create(wingGrid);
    console.log('c');
    await this.repo.save(newWingGrid);
    console.log('d');
    return 'wing grid created successfully';
  }

  /*public async findOneById(id: number) {
    return await this.repo.findOneBy({ id });
  }*/

  public async findManyByIds(ids: number[]) {
    return this.repo.findBy({ id: In(ids) });
  }
}
