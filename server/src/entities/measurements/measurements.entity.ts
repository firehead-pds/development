import { Entity, Column, PrimaryGeneratedColumn, OneToOne, JoinColumn } from 'typeorm';
import { Users } from '../users/user.entity';
import { ShirtSize, PantsSize } from './enums/measurements.enum';

@Entity({ name: 'measurements' })
export class Measurements {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'shoeSize', type: 'char', nullable: false, length: 2 })
  shoeSize: string;

  @Column({ name: 'shirtSize', type: 'enum', enum: ShirtSize, nullable: false })
  shirtSize: ShirtSize;

  @Column({ name: 'pantsSize', type: 'enum', enum: PantsSize, nullable: false })
  pantsSize: PantsSize;

  @Column({ name: 'height', type: 'char', nullable: false, length: 3 })
  height: string;

  @OneToOne(() => Users)
  @JoinColumn({ name: 'userId' })
  user: Users;
}
