import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { dbConfig } from "./config/dbConfig";
import { UsersModule } from "./entities/users/users.module";
import { MeasurementsModule } from "./entities/measurements/measurements.module";
import { AddressModule } from "./entities/address/address.module";
import { HashingModule } from "./common/hashing/hashing.module";
import { ContactUsModule } from "./entities/contactUs/contact-us.module";
import { FriendshipsModule } from './entities/friendships/friendships.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot(dbConfig),
    UsersModule,
    MeasurementsModule,
    AddressModule,
    HashingModule,
    ContactUsModule,
    FriendshipsModule
  ],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {
}
