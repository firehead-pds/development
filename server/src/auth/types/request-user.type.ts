import { User } from '../../entities/users/user.entity';

export type RequestUser = User & {
  tokenId: string;
};
