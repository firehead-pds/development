import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ApiCreatedResponse } from '@nestjs/swagger';
import { CreateWingGridDto } from './dto/create-wing-grid.dto';
import { WingGridService } from './wing-grid.service';

@Controller('wing-grids')
export class WingGridController {
  constructor(private readonly wingGridService: WingGridService) {}

  @ApiCreatedResponse({ description: 'Wing Grid created successfully' })
  @Post('create')
  public async create(@Body() body: CreateWingGridDto) {
    await this.wingGridService.create(body);
  }

  @Get(':id')
  public async getWingGrid(@Param('id') id: number) {
    return this.wingGridService.getWingGrid(id);
  }
}
