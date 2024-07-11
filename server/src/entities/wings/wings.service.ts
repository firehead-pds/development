import { Injectable } from '@nestjs/common';
import { In, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Wing } from './wing.entity';
import { WingsValidator } from './validators/wings.validator';
import { WingDto } from './dtos/wing.dto';
import { User } from '../users/user.entity';
import { UsersService } from '../users/users.service';
import { ParticipateInfo } from '../participates/interfaces/IParticipate';
import { ParticipatesService } from '../participates/participates.service';
import { Role } from '../participates/enums/participate-role';

@Injectable()
export class WingsService {
  constructor(
    @InjectRepository(Wing) private readonly repo: Repository<Wing>,
    private readonly validator: WingsValidator,
    private readonly userService: UsersService,
    private readonly participateService: ParticipatesService,
  ) {}

  public async create(wingDto: WingDto) {
    await this.validator.validateCreateWing({ name: wingDto.wingName });
    const newWing = this.repo.create({ name: wingDto.wingName });
    await this.repo.save(newWing);
    const currentUser = await this.userService.findOneById(wingDto.userId);
    console.log(newWing);
    console.log(currentUser);
    await this.participateService.create(
      { id: newWing.id },
      { id: currentUser.id },
      Role.WingChief,
    );

    return 'wing created successfully';
  }

  public async getAllWings(user: User) {
    let userWing: ParticipateInfo = {
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      wingsInfo: null,
    };
    if (await this.participateService.existsBy(user.id)) {
      const participates = await this.participateService.findByUser(user);
      let wingId = [];
      participates.forEach((participates) => {
        wingId.push(participates.wingId);
      });

      const wing = await this.findManyByIds(wingId);
      const wingInfo = [];
      for (let i = 0; i < wing.length; ++i) {
        for (let j = 0; i < participates.length; ++j) {
          if (wing[i].id === participates[j].id) {
            wingInfo.push({
              id: wing[i].id,
              name: wing[i].name,
              role: participates[j].role,
            });
          }
        }
      }
      userWing.wingsInfo = wingInfo;

      return userWing;
    } else {
      return userWing;
    }
  }

  public async findOneById(id: number) {
    return await this.repo.findOneBy({ id });
  }

  public async findManyByIds(ids: number[]) {
    return this.repo.findBy({ id: In(ids) });
  }
}
