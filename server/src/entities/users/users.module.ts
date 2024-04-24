import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { Users } from './user.entity';
import { UsersValidator } from './validators/users.validator';
import { MeasurementsModule } from '../measurements/measurements.module';
import { AddressModule } from '../address/address.module';
import { Address } from '../address/address.entity';
import { Measurements } from '../measurements/measurements.entity';
import { HashingModule } from "../../hashing/hashing.module";

@Module({
  imports: [
    TypeOrmModule.forFeature([Users, Address, Measurements]),
    MeasurementsModule,
    AddressModule,
    HashingModule
  ],
  controllers: [UsersController],
  providers: [UsersValidator, UsersService],
})
export class UsersModule {}
