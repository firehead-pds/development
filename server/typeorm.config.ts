import { DataSource, DataSourceOptions } from 'typeorm';
import { config } from 'dotenv';
import { registerAs } from '@nestjs/config';
import * as process from 'node:process';

config({ path: '.env.' + process.env.NODE_ENV });

export const dataSourceOptions: DataSourceOptions = {
  type: 'postgres',
  host: process.env.DB_HOST,
  port: +process.env.DB_PORT,
  database: process.env.DB_DATABASE,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  synchronize: process.env.NODE_ENV !== 'production',
  dropSchema: process.env.NODE_ENV === 'test',
  entities:
    process.env.NODE_ENV === 'test'
      ? ['src/**/*.entity{.js,.ts}']
      : ['dist/**/*.entity{.ts,.js}'],
  migrations: ['dist/migrations/*{.ts,.js}'],
  ssl: process.env.NODE_ENV !== 'test',
};

export default registerAs('typeorm', () => dataSourceOptions);
export const connectionSource = new DataSource(dataSourceOptions);
