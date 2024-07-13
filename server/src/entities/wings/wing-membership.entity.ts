import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from '../users/user.entity';
import { Wing } from './wing.entity';
import { Role } from './enums/participate-role';

/** @class Join table for users and wings */
@Entity()
export class WingMembership {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.wingMemberships)
  @JoinColumn()
  user: User;

  @ManyToOne(() => Wing, (wing) => wing.wingMemberships)
  @JoinColumn()
  wing: Wing;

  @Column({ type: 'enum', enum: Role })
  role: Role;

  @Column()
  rating?: number;

  @CreateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' }) // Recommended
  joinedIn: Date;
}
