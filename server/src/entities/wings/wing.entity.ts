import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Participate } from '../participates/participate.entity';
import { WingGrid } from '../wing-grids/wing-grid.entity';

@Entity({ name: 'wings' })
export class Wing {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 70 })
  name: string;

  @OneToMany(() => Participate, (participate) => participate.wing)
  participate?: Participate;

  @OneToMany(() => WingGrid, (wingGrid) => wingGrid.wing)
  wingGrid?: WingGrid;
}
