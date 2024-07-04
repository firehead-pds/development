import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';
import { User } from '../entities/users/user.entity';
import { Address } from '../entities/address/address.entity';
import { Measurements } from '../entities/measurements/measurements.entity';
import * as process from 'node:process';
import Token from '../auth/token.entity';
import { Friendship } from '../entities/friendships/friendship.entity';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        type: 'postgres',
        host: config.get<string>('DB_HOST'),
        port: +config.get('DB_PORT'),
        database: config.get('DB_DATABASE'),
        username: config.get('DB_USERNAME'),
        password: config.get('DB_PASSWORD'),
        synchronize: process.env.NODE_ENV !== 'production',
        dropSchema: process.env.NODE_ENV === 'test',
        autoLoadEntities: true,
        entities: [User, Address, Measurements, Token, Friendship],
        ssl: true,
      }),
    }),
  ],
})
export class DatabaseModule {}
