import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Wing } from './wing.entity';

@Entity()
export class Invite {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  token: string;

  @ManyToOne(() => Wing)
  wing: Wing;

  @Column()
  expiresAt: Date;
}
