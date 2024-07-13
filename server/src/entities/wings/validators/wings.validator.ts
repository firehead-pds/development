import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Wing } from '../wing.entity';
import { Repository } from 'typeorm';

@Injectable()
export class WingsValidator {
  constructor(@InjectRepository(Wing) private repo: Repository<Wing>) {}

  public async validateCreateWing(newWing: Partial<Wing>) {
    const existsWithName = await this.checkExistingName(newWing.name);

    if (existsWithName) {
      throw new ConflictException('wing name already in use');
    }
  }

  private async checkExistingName(name: string) {
    const exists = await this.repo.findOneBy({ name });
    return !!exists;
  }
}
