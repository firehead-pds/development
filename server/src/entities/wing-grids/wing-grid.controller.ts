import { Body, Controller, Post } from '@nestjs/common';
import { Public } from '../../auth/decorators/is-public.decorator';
import { ApiCreatedResponse } from '@nestjs/swagger';
import { CreateWingGridDto } from './dto/create-wing-grid.dto';
import { WingGridService } from './wing-grid.service';

@Controller('wing-grids')
export class WingGridController {
  constructor(private readonly wingGridService: WingGridService) {}

  @Public()
  @ApiCreatedResponse({ description: 'Wing Grid created successfully' })
  @Post('create')
  public async create(@Body() body: CreateWingGridDto) {
    return this.wingGridService.create(body);
  }
}
