import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { WingMembership } from './wing-membership.entity';
import { WingGrid } from '../wing-grids/wing-grid.entity';

@Entity()
export class Wing {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 64 })
  name: string;

  @OneToMany(() => WingMembership, (wingMembership) => wingMembership.wing)
  wingMemberships: WingMembership[];

  @OneToMany(() => WingGrid, (wingGrid) => wingGrid.wing)
  wingGrid?: WingGrid;
}
