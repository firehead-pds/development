import { Body, Controller, Post } from '@nestjs/common';
import { WingsService } from './wings.service';
import { ApiCreatedResponse } from '@nestjs/swagger';
import { WingDto } from './dtos/wing.dto';
import { Public } from '../../auth/decorators/is-public.decorator';

@Controller('wing')
export class WingsController {
  constructor(private readonly wingService: WingsService) {}

  @Public()
  @ApiCreatedResponse({ description: 'Wing created successfully' })
  @Post('create')
  public async create(@Body() body: WingDto) {
    return this.wingService.create(body);
  }
}
