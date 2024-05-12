import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { UsersValidator } from './validators/users.validator';
import { InjectRepository } from '@nestjs/typeorm';
import { HashingService } from '../../common/hashing/hashing.service';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly repo: Repository<User>,
    private readonly validator: UsersValidator,
    private readonly hashingService: HashingService,
  ) {}

  public async create(user: Partial<User>) {
    await this.validator.validateCreateUser(user);

    user.password = await this.hashingService.hashData(user.password);
    const newUser = this.repo.create(user);
    await this.repo.save(newUser);

    return 'user created successfully';
  }

  public async findByEmail(email: string) {
    return await this.repo.findOneBy({ email });
  }
}
