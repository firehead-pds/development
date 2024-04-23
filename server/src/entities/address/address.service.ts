import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Address } from './address.entity';
import { AddressValidator } from '../address/validators/address.validator';
import { Repository } from 'typeorm';
import IAddress from './interfaces/IAddress';

@Injectable()
export class AddressService {
  constructor(
    @InjectRepository(Address) private readonly repository: Repository<Address>,
    private readonly validator: AddressValidator,
  ) {}

  public async create(body: IAddress): Promise<Address> {
    return this.repository.save(body);
  }

  public async findAll(): Promise<Address[]> {
    return this.repository.find();
  }

  public async findOne(id: number): Promise<Address> {
    const address = await this.repository.findOne({ where: { id } });

    if (!address) {
      throw new NotFoundException(`No address found.`);
    }

    return address;
  }

  public async update(id: number, body: IAddress): Promise<Address> {
    const address = await this.repository.findOne({ where: { id } });

    if (!address) {
      throw new NotFoundException(`No address found.`);
    }

    await this.repository.update({ id }, body);

    return this.repository.findOne({ where: { id } });
  }

  public async delete(id: number): Promise<string> {
    const address = await this.repository.findOne({ where: { id } });

    if (!address) {
      throw new NotFoundException(`No address found.`);
    }

    await this.repository.delete(id);

    return 'Address successfully deleted';
  }
}
