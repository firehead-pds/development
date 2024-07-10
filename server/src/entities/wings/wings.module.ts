import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Wing } from './wing.entity';
import { WingsService } from './wings.service';
import { WingsController } from './wings.controller';
import { WingsValidator } from './validators/wings.validator';
import { UsersModule } from '../users/users.module';
import { Participate } from '../participates/participate.entity';
import { ParticipatesService } from '../participates/participates.service';

@Module({
  imports: [TypeOrmModule.forFeature([Wing, Participate]), UsersModule],
  controllers: [WingsController],
  providers: [WingsValidator, WingsService, ParticipatesService],
  exports: [WingsService],
})
export class WingsModule {}
