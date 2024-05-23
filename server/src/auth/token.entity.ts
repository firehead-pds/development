import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from '../entities/users/user.entity';

@Entity()
export default class Token {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  tokenId: string;

  @ManyToOne(() => User, (user) => user.refreshTokens)
  user: User;
}
