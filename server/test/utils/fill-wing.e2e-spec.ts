import { createUserAndLogin } from './auth';
import { connectionSource } from '../../typeorm.config';
import { User } from '../../src/entities/users/user.entity';
import { fsReadFile } from 'ts-loader/dist/utils';

export default async function fillWingWithFriends() {
  try {
    const dataSource = connectionSource.getRepository(User);
    console.log(dataSource.find());

    const users = JSON.parse(
      fsReadFile('C:\\Users\\davij\\Programming\\firehead\\server\\test.json'),
    ) as User[];

    console.log(users[0].firstName);
  } catch (e) {
    console.log(e);
  }
}

fillWingWithFriends().then();
