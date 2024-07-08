import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';
import { dataSourceOptions } from '../../typeorm.config';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
<<<<<<< HEAD
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
        ssl: false,
      }),
=======
      useFactory: () => dataSourceOptions,
>>>>>>> f9ef3f73c683ff1c63d604749cced1b310afad79
    }),
  ],
})
export class DatabaseModule {}
