import {
  Column,
  Entity,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Address } from '../address/address.entity';
import { Measurements } from '../measurements/measurements.entity';
import Token from '../../auth/token.entity';
import { Friendship } from '../friendships/friendship.entity';
import { Participate } from '../participates/participate.entity';
import { GridCell } from '../grid-cell/grid-cell.entity';

@Entity({ name: 'users' })
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 25 })
  firstName: string;

  @Column({ length: 70 })
  lastName: string;

  @Column()
  birthdate: Date;

  @Column({ length: 70, unique: true })
  email: string;

  @Column({ type: 'char', length: 60 })
  password: string;

  @Column({ length: 11 })
  phoneNumber: string;

  @Column({ type: 'char', length: 11, unique: true })
  cpf: string;

  @OneToOne(() => Address, (address) => address.user, { cascade: true })
  address?: Address;

  @OneToOne(() => Measurements, (measurements) => measurements.user, {
    cascade: true,
  })
  measurements?: Measurements;

  @OneToMany(() => Token, (token) => token.user)
  refreshTokens?: Token;

  @OneToMany(() => Friendship, (friendship) => friendship.creator)
  sentFriendRequests: Friendship;

  @OneToMany(() => Friendship, (friendship) => friendship.receiver)
  receivedFriendRequests: Friendship;

  @OneToMany(() => Participate, (participate) => participate.userId)
  participate?: Participate;

  @OneToMany(() => GridCell, (gridCell) => gridCell.user)
  gridCell?: GridCell;
}
