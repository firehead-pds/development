import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
  ParseIntPipe,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';
import { Users } from './user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UsersValidator } from './validators/users.validator';
import { CreateUserDTO } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UsersService } from './users.service';

@Controller('/users')
export class UsersController {
  constructor(@InjectRepository(Users) private repository: Repository<Users>, private readonly validator: UsersValidator, private readonly service: UsersService) {}

  @Post()
  public async create(@Body() body: CreateUserDTO): Promise<Users> {

    return this.service.create(body);
  }

  @Get()
  public async findAll(): Promise<Users[]> {

    return this.service.findAll();
  }

  @Get(':id')
  public async findOne(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<Users> {

    return this.service.findOne(id);
  }

  @Put(':id')
  public async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: UpdateUserDto,
  ): Promise<Users> {

    return this.service.update(id, body);
  }

  @Delete(':id')
  public async delete(@Param('id', ParseIntPipe) id: number): Promise<string> {

    return this.service.delete(id);
  }
}