import { DataSource, DataSourceOptions } from 'typeorm';
import * as path from 'node:path';
import { config } from 'dotenv';

config({ path: path.join(__dirname, '.env.development') });

export const dataSourceOptions: DataSourceOptions = {
  type: 'postgres',
  host: process.env.DB_HOST,
  port: +process.env.DB_PORT,
  database: process.env.DB_DATABASE,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  synchronize: process.env.NODE_ENV !== 'production',
  dropSchema: process.env.NODE_ENV === 'test',
  entities: ['dist/**/*.entity{.ts,.js}'],
  migrations: ['dist/migrations/*{.ts,.js}'],
  ssl: true,
};

export const connectionSource = new DataSource(dataSourceOptions);
