import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Wing } from '../wings/wing.entity';
import { GridCell } from '../grid-cell/grid-cell.entity';

@Entity({ name: 'wingGrid' })
export class WingGrid {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 70 })
  name: string;

  @Column({ type: 'int' })
  rows: number;

  @Column({ type: 'int' })
  cols: number;

  @ManyToOne(() => Wing, (wing) => wing.wingGrid)
  wing?: Wing;

  @OneToMany(() => GridCell, (gridCell) => gridCell.wingGrid)
  gridCell?: GridCell;
}
