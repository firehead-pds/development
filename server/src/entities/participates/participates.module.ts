import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ParticipatesService } from './participates.service';
import { ParticipatesController } from './participates.controller';
import { Participate } from './participate.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Participate])],
  controllers: [ParticipatesController],
  providers: [ParticipatesService],
  exports: [ParticipatesService],
})
export class ParticipatesModule {}
