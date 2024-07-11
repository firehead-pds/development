import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { WingGrid } from '../wing-grid.entity';

@Injectable()
export class WingGridValidator {
  constructor(@InjectRepository(WingGrid) private repo: Repository<WingGrid>) {}

  public async validateCreateWingGrid(newWingGrid: Partial<WingGrid>) {
    const existsWithName = await this.checkExistingName(
      newWingGrid.wingGridName,
    );
    if (existsWithName) {
      throw new ConflictException(`Grid name already in use`);
    }
  }

  private async checkExistingName(wingGridName: string) {
    const exists = await this.repo.findOneBy({ wingGridName });
    return !!exists;
  }
}
