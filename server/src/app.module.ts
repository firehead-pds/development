import { Module, OnModuleInit } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './entities/users/users.module';
import { MeasurementsModule } from './entities/measurements/measurements.module';
import { AddressModule } from './entities/address/address.module';
import { HashingModule } from './common/hashing/hashing.module';
import { ContactUsModule } from './entities/contactUs/contact-us.module';
import * as process from 'node:process';
import { DatabaseModule } from './config/database.module';
import { AuthModule } from './auth/auth.module';
import { WingsModule } from './entities/wings/wings.module';
import fastifyCookie from '@fastify/cookie';
import { APP_GUARD, HttpAdapterHost } from '@nestjs/core';
import AccessTokenGuard from './auth/guards/access-token.guard';
import typeormConfig from '../typeorm.config';
import emailConfiguration from './common/email/email.configuration';
import { WingGridModule } from './entities/wing-grids/wing-grid.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [typeormConfig, emailConfiguration],
      envFilePath: `.env.${process.env.NODE_ENV}`,
    }),
    DatabaseModule,
    UsersModule,
    MeasurementsModule,
    AddressModule,
    HashingModule,
    ContactUsModule,
    AuthModule,
    WingsModule,
    WingGridModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: AccessTokenGuard,
    },
  ],
})
export class AppModule implements OnModuleInit {
  constructor(
    private readonly httpAdapterHost: HttpAdapterHost,
    private readonly configService: ConfigService,
  ) {}

  async onModuleInit() {
    const app = this.httpAdapterHost.httpAdapter.getInstance();
    await app.register(fastifyCookie, {
      secret: this.configService.get<string>('COOKIE_SECRET'),
    });
  }
}
