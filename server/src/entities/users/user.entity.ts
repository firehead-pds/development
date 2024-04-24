import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Address } from "../address/address.entity";
import { Measurements } from "../measurements/measurements.entity";

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 25 })
  firstName: string;

  @Column({ length: 70 })
  lastName: string;

  @Column()
  birthdate: Date;

  @Column({ length: 70, unique: true })
  email: string;

  @Column({ type: "char", length: 60 })
  password: string;

  @Column({ length: 11 })
  phoneNumber: string;

  @Column({ type: "char", length: 11, unique: true })
  cpf: string;

  @OneToOne(() => Address, address => address.user, { cascade: true })
  address: Address;

  @OneToOne(() => Measurements, measurements => measurements.user, { cascade: true })
  measurements: Measurements;
}