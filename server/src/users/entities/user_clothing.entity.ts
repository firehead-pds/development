import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Users } from './user.entity';
import { ShirtSize, PantsSize } from '../enums/clothing-sizes.enum';

@Entity({ name: 'users_clothing' })
export class UsersClothing {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'shoe_size', type: 'char', nullable: false, length: 2 })
  shoe_size: string;

  @Column({ name: 'shirt_size', type: 'enum', nullable: false })
  shirt_size: ShirtSize;

  @Column({ name: 'pants_size', type: 'enum', nullable: false })
  pants_size: PantsSize;

  @Column({ name: 'height', type: 'char', nullable: false, length: 3 })
  height: string;

  @OneToMany(() => Users, (user) => user.userClothing)
  users: Users[];
}
