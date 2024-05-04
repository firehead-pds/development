import { Module } from '@nestjs/common';
import { GridService } from './grid.service';

@Module({
  providers: [GridService]
})
export class GridModule {}
