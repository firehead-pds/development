import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'users' })
export class Users {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'firstName', type: 'varchar', nullable: false, length: 25 })
  firstName: string;

  @Column({ name: 'lastName', type: 'varchar', nullable: false, length: 70 })
  lastName: string;

  @Column({ name: 'birthdate', type: 'date', nullable: false })
  birthdate: Date;

  @Column({
    name: 'email',
    type: 'varchar',
    nullable: false,
    length: 70,
    unique: true,
  })
  email: string;

  @Column({ name: 'password', type: 'varchar', nullable: false, length: 24 })
  password: string;

  @Column({ name: 'phoneNumber', type: 'varchar', nullable: false, length: 11 })
  phoneNumber: string;

  @Column({ name: 'cpf', type: 'char', nullable: false, length: 11 })
  cpf: string;
}