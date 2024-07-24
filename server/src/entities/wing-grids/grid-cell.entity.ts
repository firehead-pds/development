import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { WingGrid } from './wing-grid.entity';
import { User } from '../users/user.entity';

@Entity()
export class GridCell {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column()
  row: number;

  @Column()
  col: number;

  @ManyToOne(() => WingGrid, (wingGrid) => wingGrid.gridCells)
  wingGrid: WingGrid;

  @ManyToOne(() => User, (user) => user.gridCell)
  user?: User;
}
