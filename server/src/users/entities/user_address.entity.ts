import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Users } from './user.entity';

@Entity({ name: 'users_address' })
export class UsersAddress {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'zip_code', type: 'varchar', nullable: false, length: 8 })
  zip_code: string;

  @Column({ name: 'street_name', type: 'varchar', nullable: false, length: 70 })
  street_name: string;

  @Column({ name: 'number', type: 'varchar', nullable: false, length: 4 })
  number: string;

  @Column({ name: 'complement', type: 'varchar', nullable: false, length: 20 })
  complement: string;

  @Column({ name: 'neighborhood', type: 'varchar', nullable: false, length: 30 })
  neighborhood: string;

  @Column({ name: 'city', type: 'varchar', nullable: false, length: 30 })
  city: string;

  @Column({ name: 'state', type: 'varchar', nullable: false, length: 30 })
  state: string;

  @OneToMany(() => Users, (user) => user.address)
  users: Users[];
}
