import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';
import { User } from '../entities/users/user.entity';
import { Address } from '../entities/address/address.entity';
import { Measurements } from '../entities/measurements/measurements.entity';

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
        synchronize: true,
        autoLoadEntities: true,
        entities: [User, Address, Measurements],
        ssl: true,
      }),
    }),
  ],
})
export class DatabaseModule {}
