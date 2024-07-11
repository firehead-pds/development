import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { IsOptional } from 'class-validator';
import { WingGrid } from '../wing-grids/wing-grid.entity';
import { User } from '../users/user.entity';

@Entity({ name: 'gridCell' })
export class GridCell {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 70 })
  name: string;

  @IsOptional()
  @Column({ type: 'int' })
  row?: number;

  @IsOptional()
  @Column({ type: 'int' })
  col?: number;

  @ManyToOne(() => WingGrid, (wingGrid) => wingGrid.gridCell)
  wingGrid: WingGrid;

  @ManyToOne(() => User, (user) => user.gridCell)
  user: User;
}
