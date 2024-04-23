import {
  Body,
  ConflictException,
  Injectable,
  NotFoundException,
  Param,
  ParseIntPipe,
} from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { Users } from './user.entity';
import { UsersValidator } from './validators/users.validator';
import { InjectRepository } from '@nestjs/typeorm';
import { MeasurementsService } from '../measurements/measurements.service';
import { AddressService } from '../address/address.service';
import IUser from './interfaces/IUser';
import IAddress from '../address/interfaces/IAddress';
import IMeasurements from '../measurements/interfaces/IMeasurements';
import { Measurements } from '../measurements/measurements.entity';
import { Address } from '../address/address.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(Users) private readonly repoUsers: Repository<Users>,
    @InjectRepository(Address) readonly repoAddress: Repository<Address>,
    @InjectRepository(Measurements)
    readonly repoMeasurements: Repository<Measurements>,
    private readonly validator: UsersValidator,
    private addressService: AddressService,
    private measurementsService: MeasurementsService,
    private dataSource: DataSource,
  ) {}

  public async create(
    userData: IUser,
    addressData: IAddress,
    measurementsData: IMeasurements,
  ) {
    const queryRunner = this.dataSource.createQueryRunner();

    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const user = this.repoUsers.create(userData);

      const savedUser = await queryRunner.manager.save(user);

      const userId = savedUser.id;
      console.log(userId);

      addressData.user = savedUser;
      measurementsData.user = savedUser;

      const address = this.repoAddress.create(addressData);
      await queryRunner.manager.save(address);

      const measurements = this.repoMeasurements.create(measurementsData);
      await queryRunner.manager.save(measurements);

      await queryRunner.commitTransaction();
    } catch (err) {
      await queryRunner.rollbackTransaction();
      throw err;
    } finally {
      await queryRunner.release();
    }
    return { ...userData, addressData, measurementsData };
  }

  public async findAll(): Promise<Users[]> {
    return this.repoUsers.find();
  }

  public async findOne(id: number): Promise<Users> {
    const user = await this.repoUsers.findOne({ where: { id } });

    if (!user) {
      throw new NotFoundException(`No users found.`);
    }

    return user;
  }

  public async update(id: number, body: IUser): Promise<Users> {
    const user = await this.repoUsers.findOne({ where: { id } });

    if (!user) {
      throw new NotFoundException(`No users found.`);
    }

    await this.validator.validateUserUpdate(id, body, user);

    await this.repoUsers.update({ id }, body);

    return this.repoUsers.findOne({ where: { id } });
  }

  public async delete(id: number): Promise<string> {
    const user = await this.repoUsers.findOne({ where: { id } });

    if (!user) {
      throw new NotFoundException(`No users found.`);
    }

    await this.repoUsers.delete(id);

    return 'User successfully deleted';
  }
}
