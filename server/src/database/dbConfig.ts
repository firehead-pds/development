import { TypeOrmModuleOptions } from "@nestjs/typeorm";

require("dotenv").config();

export const dbConfig: TypeOrmModuleOptions = {
  type: "postgres",
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  database: process.env.DB_DATABASE,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  synchronize: true,
  autoLoadEntities: true,
  entities: [__dirname + "/../**/*.entity.{ts,js}"],
  ssl: true
};
