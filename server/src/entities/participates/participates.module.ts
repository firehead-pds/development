import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ParticipatesService } from './participates.service';
import { ParticipatesController } from './participates.controller';
import { Participate } from './participate.entity';
import { WingsService } from '../wings/wings.service';
import { WingsModule } from '../wings/wings.module';
import { Wing } from '../wings/wing.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Participate, Wing]), WingsModule],
  controllers: [ParticipatesController],
  providers: [ParticipatesService, WingsService],
  exports: [ParticipatesService],
})
export class ParticipatesModule {}
