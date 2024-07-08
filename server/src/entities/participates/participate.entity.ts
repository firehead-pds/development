import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from '../users/user.entity';
import { Wing } from '../wings/wing.entity';

@Entity({ name: 'participate' })
export class Participate {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user)
  user: User;

  @ManyToOne(() => Wing, (wing) => wing)
  wing: Wing;

  @Column({ length: 9 })
  role: string;

  @Column({ type: 'integer' })
  rating: number;

  @Column({ type: 'timestamp' })
  joined_in: Date;
}
