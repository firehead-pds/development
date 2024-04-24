import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
  ParseIntPipe,
} from '@nestjs/common';
import { User } from './user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UsersService } from './users.service';
import { ApiConflictResponse, ApiCreatedResponse } from "@nestjs/swagger";

@Controller('/users')
export class UsersController {
  constructor(
    private readonly service: UsersService,
  ) {}

  @ApiCreatedResponse({description: "User created successfully"})
  @ApiConflictResponse({
    description: 'Conflict! This could be due to existing cpf or email conflict.',
  })
  @Post()
  public async create(@Body() body: CreateUserDto) {
    return this.service.create(body);
  }

  @Get()
  public async findAll(): Promise<User[]> {
    return this.service.findAll();
  }

  @Get(':id')
  public async findOne(@Param('id', ParseIntPipe) id: number): Promise<User> {
    return this.service.findOne(id);
  }

  @Put(':id')
  public async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: UpdateUserDto,
  ): Promise<User> {
    return this.service.update(id, body);
  }

  @Delete(':id')
  public async delete(@Param('id', ParseIntPipe) id: number): Promise<string> {
    return this.service.delete(id);
  }
}
