import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { UsersClothing } from './user_clothing.entity';
import { UsersAddress } from './user_address.entity';

@Entity({ name: 'users' })
export class Users {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'name', type: 'varchar', nullable: false, length: 70 })
  name: string;

  @Column({ name: 'brith_date', type: 'date', nullable: false })
  birth_date: Date;

  @Column({ name: 'age', type: 'smallint', nullable: false })
  age: number;

  @Column({ name: 'email', type: 'varchar', nullable: false, length: 70, unique: true })
  email: string;

  @Column({ name: 'password', type: 'varchar', nullable: false, length: 24 })
  password: string;

  @Column({ name: 'phone_number', type: 'varchar', nullable: false, length: 11 })
  phone_number: string;

  @Column({ name: 'cpf', type: 'char', nullable: false, length: 11 })
  cpf: string;

  @ManyToOne(() => UsersClothing, (usersClothing) => usersClothing.users)
  @JoinColumn({ name: 'clothing_id' })
  userClothing: UsersClothing;

  @ManyToOne(() => UsersAddress, (usersAddress) => usersAddress.users)
  @JoinColumn({ name: 'address_id' })
  address: UsersAddress;
}
