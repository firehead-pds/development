import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Measurements } from './measurements.entity';
import { Repository } from 'typeorm';

@Injectable()
export class MeasurementsService {
  constructor(
    @InjectRepository(Measurements)
    private readonly repository: Repository<Measurements>,
  ) {}
}
