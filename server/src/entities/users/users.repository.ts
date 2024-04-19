import { EntityRepository, Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { Users } from './user.entity';

@Injectable()
@EntityRepository(Users)
export class UsersRepository extends Repository<Users> {

}
