import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Participate } from './participate.entity';
import { ParticipateInfo } from './interfaces/IParticipate';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../users/user.entity';
import { WingsService } from '../wings/wings.service';

@Injectable()
export class ParticipatesService {
  constructor(
    @InjectRepository(Participate)
    private readonly repo: Repository<Participate>,
    private wingsService: WingsService,
  ) {}

  public async getAllWings(user: User) {
    let userWing: ParticipateInfo = {
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      wingsInfo: null,
    };
    if (await this.repo.existsBy({ user: user })) {
      const participates = await this.repo.findBy({ user: user });
      let wingId = [];
      participates.forEach((participates) => {
        wingId.push(participates.wing);
      });

      const wing = await this.wingsService.findManyByIds(wingId);
      const wingInfo = [];
      for (let i = 0; i < participates.length; ++i) {
        wingInfo.push({
          id: wing[i].id,
          name: wing[i].name,
          role: participates[i].role,
        });
      }
      userWing.wingsInfo = wingInfo;

      return userWing;
    } else {
      return userWing;
    }
  }
}
/*

*/
