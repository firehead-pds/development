import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { User } from './user.entity';
import { UsersValidator } from './validators/users.validator';
import { MeasurementsModule } from '../measurements/measurements.module';
import { AddressModule } from '../address/address.module';
import { Address } from '../address/address.entity';
import { Measurements } from '../measurements/measurements.entity';
import { HashingModule } from '../../common/hashing/hashing.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, Address, Measurements]),
    MeasurementsModule,
    AddressModule,
    HashingModule,
  ],
  controllers: [UsersController],
  providers: [UsersValidator, UsersService],
  exports: [UsersService],
})
export class UsersModule {}
