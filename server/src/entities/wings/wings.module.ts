import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WingsService } from './wings.service';
import { WingsController } from './wings.controller';
import { Wing } from './wing.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Wing])],
  controllers: [WingsController],
  providers: [WingsService],
  exports: [WingsService],
})
export class WingsModule {}
