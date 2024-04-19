import { Entity, Column, PrimaryGeneratedColumn, OneToOne, JoinColumn } from 'typeorm';
import { Users } from '../users/user.entity';

@Entity({ name: 'address' })
export class Address {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'postalCode', type: 'varchar', nullable: false, length: 8 })
  postalCode: string;

  @Column({ name: 'addressLine', type: 'varchar', nullable: false, length: 70 })
  addressLine: string;

  @Column({ name: 'addressNumber', type: 'varchar', nullable: false, length: 4 })
  addressNumber: string;

  @Column({ name: 'complement', type: 'varchar', nullable: false, length: 20 })
  complement: string;

  @Column({ name: 'district', type: 'varchar', nullable: false, length: 30 })
  district: string;

  @Column({ name: 'city', type: 'varchar', nullable: false, length: 30 })
  city: string;

  @Column({ name: 'state', type: 'varchar', nullable: false, length: 30 })
  state: string;

  @OneToOne(() => Users)
  @JoinColumn({ name: 'user_id' })
  user: Users;
}
