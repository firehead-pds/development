import { Controller } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Measurements } from './measurements.entity';
import { MeasurementsService } from './measurements.service';

@Controller('/measurements')
export class MeasurementsController {
  constructor(
    @InjectRepository(Measurements)
    private repository: Repository<Measurements>,
    private readonly service: MeasurementsService,
  ) {}
}
