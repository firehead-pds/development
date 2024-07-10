import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Wing } from './wing.entity';
import { WingsService } from './wings.service';
import { WingsController } from './wings.controller';
import { WingsValidator } from './validators/wings.validator';

@Module({
  imports: [TypeOrmModule.forFeature([Wing])],
  controllers: [WingsController],
  providers: [WingsValidator, WingsService],
  exports: [WingsService],
})
export class WingsModule {}
