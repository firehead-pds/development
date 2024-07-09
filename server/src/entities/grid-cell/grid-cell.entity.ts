import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { WingGrid } from '../wing-grids/wing-grid.entity';
import { User } from '../users/user.entity';

@Entity({ name: 'gridCell' })
export class GridCell {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 70 })
  name: string;

  @Column({ type: 'int' })
  row: number;

  @Column({ type: 'int' })
  col: number;

  @ManyToOne(() => WingGrid, (wingGrid) => wingGrid.gridCell)
  wingGrid: WingGrid;

  @ManyToOne(() => User, (user) => user.gridCell)
  user: User;
}
