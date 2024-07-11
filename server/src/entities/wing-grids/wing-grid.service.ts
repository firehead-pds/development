import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { WingGrid } from './wing-grid.entity';
import { WingGridValidator } from './validators/wing-grid.validator';
import { WingsService } from '../wings/wings.service';
import { CreateWingGridDto } from './dto/create-wing-grid.dto';

@Injectable()
export class WingGridService {
  constructor(
    @InjectRepository(WingGrid) private readonly repo: Repository<WingGrid>,
    private readonly validator: WingGridValidator,
    private readonly wingService: WingsService,
  ) {}

  public async create(wingGridDto: CreateWingGridDto) {
    await this.validator.validateCreateWingGrid({
      wingGridName: wingGridDto.wingGridName,
    });
    const currentWing = await this.wingService.findOneById(wingGridDto.wingId);

    const newWingGrid = this.repo.create({
      wingGridName: wingGridDto.wingGridName,
      rows: wingGridDto.rows,
      cols: wingGridDto.cols,
      wing: currentWing,
    });

    await this.repo.save(newWingGrid);

    return 'wing grid created successfully';
  }

  public async findManyByIds(ids: number[]) {
    return this.repo.findBy({ id: In(ids) });
  }
}
