import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Participate } from './participate.entity';
import { ParticipatesService } from './participates.service';
import { ParticipatesController } from './participates.controller';
import { Wing } from '../wings/wing.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Participate, Wing])],
  controllers: [ParticipatesController],
  providers: [ParticipatesService],
  exports: [ParticipatesService],
})
export class ParticipatesModule {}
