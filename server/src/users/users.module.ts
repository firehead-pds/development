import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { UsersProviders } from './users.providers';
import { UsersService } from './users.service';

@Module({
  imports: [DatabaseModule],
  providers: [...UsersProviders, UsersService],
})
export class UsersModule {}
