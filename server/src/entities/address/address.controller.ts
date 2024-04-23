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
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AddressValidator } from './validators/address.validator';
import { CreateAddressDto } from './dto/create-address.dto';
import { UpdateAddressDto } from './dto/update-address.dto';
import { Address } from './address.entity';
import { AddressService } from './address.service';

@Controller('/address')
export class AddressController {
  constructor(
    @InjectRepository(Address)
    private repository: Repository<Address>,
    private readonly service: AddressService,
  ) {}

  @Post()
  public async create(@Body() body: CreateAddressDto): Promise<Address> {
    return this.service.create(body);
  }

  @Get()
  public async findAll(): Promise<Address[]> {
    return this.service.findAll();
  }

  @Get(':id')
  public async findOne(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<Address> {
    return this.service.findOne(id);
  }

  @Put(':id')
  public async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: UpdateAddressDto,
  ): Promise<Address> {
    return this.service.update(id, body);
  }

  @Delete(':id')
  public async delete(@Param('id', ParseIntPipe) id: number): Promise<string> {
    return this.service.delete(id);
  }
}
