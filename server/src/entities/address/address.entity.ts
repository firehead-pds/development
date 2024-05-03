import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from '../users/user.entity';

@Entity({ name: 'address' })
export class Address {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'postalCode', type: 'varchar', nullable: false, length: 9 })
  postalCode: string;

  @Column({ name: 'addressLine', type: 'varchar', nullable: false, length: 70 })
  addressLine: string;

  @Column({ type: 'varchar', length: 5, nullable: true })
  addressNumber: string;

  @Column({ nullable: true })
  complement?: string;

  @Column({ length: 30 })
  district: string;

  @Column({ length: 30 })
  city: string;

  @Column({ length: 30 })
  state: string;

  @OneToOne(() => User, (user) => user.address)
  @JoinColumn()
  user: User;
}
