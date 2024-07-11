import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Participate } from './participate.entity';
import { Role } from './enums/participate-role';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../users/user.entity';
import { Wing } from '../wings/wing.entity';

@Injectable()
export class ParticipatesService {
  constructor(
    @InjectRepository(Participate)
    private readonly repo: Repository<Participate>,
  ) {}

  public async create(
    wingId: Partial<Wing>,
    userId: Partial<User>,
    role: Role,
  ) {
    const participate = {
      wingId: wingId,
      userId: userId,
      role: role,
      rating: 5,
      joinedIn: new Date(),
    };

    console.log(Participate);
    const newParticipate = this.repo.create(participate);
    console.log(newParticipate);
    await this.repo.save(newParticipate);
  }

  public async findByUser(user: User) {
    return await this.repo.findBy({ userId: user });
  }
  public async findByWing(wing: Wing) {
    return await this.repo.findBy({ wingId: wing });
  }
  public async existsBy(id: number) {
    return await this.repo.existsBy({ id });
  }
}
