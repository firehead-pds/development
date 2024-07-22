import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from '../users/user.entity';
import { ShirtSize } from './enums/measurements-shirt-size';
import { PantsSize } from './enums/measurements-pants-size';

@Entity({ name: 'measurements' })
export class Measurements {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'char', length: 2 })
  shoeSize: string;

  @Column({ type: 'enum', enum: ShirtSize })
  shirtSize: ShirtSize;

  @Column({ type: 'enum', enum: PantsSize })
  pantsSize: PantsSize;

  @Column({ type: 'char', length: 3 })
  height: string;

  @OneToOne(() => User, (user) => user.measurements)
  @JoinColumn()
  user: User;
}
