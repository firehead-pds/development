import { Injectable } from '@nestjs/common';
import { In, Repository } from 'typeorm';
import { Wing } from './wing.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { WingsValidator } from './validators/wings.validator';

@Injectable()
export class WingsService {
  constructor(
    @InjectRepository(Wing) private readonly repo: Repository<Wing>,
    private readonly validator: WingsValidator,
  ) {}

  public async create(wing: Partial<Wing>) {
    await this.validator.validateCreateWing(wing);

    const newWing = this.repo.create(wing);
    await this.repo.save(newWing);
    return 'wing created successfully';
  }

  /*public async findOneById(id: number) {
    return await this.repo.findOneBy({ id });
  }*/

  public async findManyByIds(ids: number[]) {
    return this.repo.findBy({ id: In(ids) });
  }
}
