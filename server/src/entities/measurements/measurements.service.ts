import {
  Body,
  Injectable,
  NotFoundException,
  Param,
  ParseIntPipe,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Measurements } from '../measurements/measurements.entity';
import { MeasurementsValidator } from '../measurements/validators/measurements.validator';
import { Repository } from 'typeorm';

@Injectable()
export class MeasurementsService {
  constructor(
    @InjectRepository(Measurements)
    private readonly repository: Repository<Measurements>,
    private readonly validator: MeasurementsValidator,
  ) {}

  public async create(body): Promise<Measurements> {
    return this.repository.save(body);
  }

  public async findAll(): Promise<Measurements[]> {
    return this.repository.find();
  }

  public async findOne(id: number): Promise<Measurements> {
    const measurements = await this.repository.findOne({ where: { id } });

    if (!measurements) {
      throw new NotFoundException(`No measurements found.`);
    }

    return measurements;
  }

  public async update(id: number, body): Promise<Measurements> {
    const measurements = await this.repository.findOne({ where: { id } });

    if (!measurements) {
      throw new NotFoundException(`No measurements found.`);
    }

    await this.repository.update({ id }, body);

    return this.repository.findOne({ where: { id } });
  }

  public async delete(id: number): Promise<string> {
    const user = await this.repository.findOne({ where: { id } });

    if (!user) {
      throw new NotFoundException(`No measurements found.`);
    }

    await this.repository.delete(id);

    return 'Measurements successfully deleted';
  }
}
