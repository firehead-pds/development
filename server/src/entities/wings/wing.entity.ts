import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Participate } from '../participates/participate.entity';

@Entity({ name: 'wings' })
export class Wing {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 70 })
  name: string;

  @OneToMany(() => Participate, (participate) => participate)
  participate?: Participate;
}
