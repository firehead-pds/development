import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './entities/users/users.module';
import { MeasurementsModule } from './entities/measurements/measurements.module';
import { AddressModule } from './entities/address/address.module';
import { HashingModule } from './common/hashing/hashing.module';
import { ContactUsModule } from './entities/contactUs/contact-us.module';
import * as process from 'node:process';
import { DatabaseModule } from './config/database.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `.env.${process.env.NODE_ENV}`,
    }),
    DatabaseModule,
    UsersModule,
    MeasurementsModule,
    AddressModule,
    HashingModule,
    ContactUsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
