import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WingsService } from './wings.service';
import { WingsController } from './wings.controller';
import { Wing } from './wing.entity';
import { Participate } from '../participates/participate.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Wing]), Participate],
  controllers: [WingsController],
  providers: [WingsService],
  exports: [WingsService],
})
export class WingsModule {}
