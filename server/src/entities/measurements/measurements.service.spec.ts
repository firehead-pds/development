import { Test, TestingModule } from '@nestjs/testing';
import { MeasurementsService } from './measurements.service';

describe('MeasurementsService', () => {
  let service: MeasurementsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MeasurementsService],
    }).compile();

    service = module.get<MeasurementsService>(MeasurementsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
