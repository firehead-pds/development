import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Wing } from '../wings/wing.entity';
import { GridCell } from './grid-cell.entity';

@Entity()
export class WingGrid {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 70 })
  name: string;

  @Column()
  rows: number;

  @Column()
  cols: number;

  @ManyToOne(() => Wing, (wing) => wing.wingGrid)
  wing: Wing;

  @OneToMany(() => GridCell, (gridCell) => gridCell.wingGrid)
  gridCells: GridCell[];
}
