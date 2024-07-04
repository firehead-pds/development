import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';
import { FriendRequestStatus } from './enums/friend-request-status';
import { User } from '../users/user.entity';

@Entity()
@Unique(['creator', 'receiver'])
export class Friendship {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.sentFriendRequests)
  @JoinColumn()
  creator: User;

  @ManyToOne(() => User, (user) => user.receivedFriendRequests)
  @JoinColumn()
  receiver: User;

  @Column({ type: 'enum', enum: FriendRequestStatus })
  status: FriendRequestStatus;
}
