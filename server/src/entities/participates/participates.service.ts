import { Injectable } from '@nestjs/common';
import { In, Repository } from 'typeorm';
import { Participate } from './participate.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class ParticipatesService {
  constructor(
    @InjectRepository(Participate)
    private readonly repo: Repository<Participate>,
  ) {}

  /*public async create(user: Partial<User>) {
    await this.validator.validateCreateUser(user);

    user.password = await this.hashingService.hashData(user.password);
    const newUser = this.repo.create(user);
    await this.repo.save(newUser);

    return 'user created successfully';
  }*/

  public async findOneById(id: number) {
    return await this.repo.findOneBy({ id });
  }

  public async findManyByIds(ids: number[]) {
    return this.repo.findBy({ id: In(ids) });
  }
}
