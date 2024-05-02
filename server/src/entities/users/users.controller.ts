import { Body, Controller, Post } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UsersService } from './users.service';
import { ApiConflictResponse, ApiCreatedResponse } from '@nestjs/swagger';

@Controller('/users')
export class UsersController {
  constructor(private readonly service: UsersService) {}

  @ApiCreatedResponse({ description: 'User created successfully' })
  @ApiConflictResponse({
    description:
      'Conflict! This could be due to existing cpf or email conflict.',
  })
  @Post()
  public async create(@Body() body: CreateUserDto) {
    return this.service.create(body);
  }
}
