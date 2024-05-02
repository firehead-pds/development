import { Controller } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Address } from './address.entity';
import { AddressService } from './address.service';

@Controller('/address')
export class AddressController {
  constructor(
    @InjectRepository(Address)
    private repository: Repository<Address>,
    private readonly service: AddressService,
  ) {}
}
