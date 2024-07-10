import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from '../users/user.entity';
import { Wing } from '../wings/wing.entity';
import { Role } from './enums/participate-role';

@Entity({ name: 'participate' })
export class Participate {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.participate)
  userId: User;

  @ManyToOne(() => Wing, (wing) => wing.participate)
  wingId: Wing;

  @Column({ type: 'enum', enum: Role })
  role: Role;

  @Column({ type: 'integer' })
  rating?: number;

  @Column({ type: 'timestamp' })
  joinedIn: Date;
}
