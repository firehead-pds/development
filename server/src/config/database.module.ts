import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';
import { User } from '../entities/users/user.entity';
import { Address } from '../entities/address/address.entity';
import { Measurements } from '../entities/measurements/measurements.entity';
import * as process from 'node:process';
import Token from '../auth/token.entity';
import { Friendship } from '../entities/friendships/friendship.entity';
import { dataSourceOptions } from '../../typeorm.config';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => dataSourceOptions,
    }),
  ],
})
export class DatabaseModule {}
