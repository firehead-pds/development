import { Module } from '@nestjs/common';
import { FriendshipsService } from './friendships.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Friendship } from './friendship.entity';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [TypeOrmModule.forFeature([Friendship]), UsersModule],
  providers: [FriendshipsService],
})
export class FriendshipsModule {}
