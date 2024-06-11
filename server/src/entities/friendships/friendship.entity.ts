import {
  Column,
  Entity,
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

  @Column()
  @ManyToOne(() => User, (user) => user.sentFriendRequests)
  creator: User;

  @ManyToOne(() => User, (user) => user.receivedFriendRequests)
  @Column()
  receiver: User;

  @Column({ type: 'enum', enum: FriendRequestStatus })
  status: FriendRequestStatus;
}
