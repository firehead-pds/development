import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { Users } from './user.entity';
import { UsersRepository } from './users.repository';
import { UsersValidator } from './validators/users.validator';

@Module({
  imports: [TypeOrmModule.forFeature([Users])],
  controllers: [UsersController],
  providers: [UsersValidator, UsersService, UsersRepository],
})
export class UsersModule {}
