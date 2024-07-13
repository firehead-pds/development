import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { WingGrid } from './wing-grid.entity';
import { WingGridValidator } from './validators/wing-grid.validator';
import { CreateWingGridDto } from './dto/create-wing-grid.dto';
import { WingsService } from '../wings/wings.service';
import { GridCellService } from '../grid-cell/grid-cell.service';
import { User } from '../users/user.entity';
import { UsersService } from '../users/users.service';
import { WingMembershipService } from '../wings/wing-membership.service';

@Injectable()
export class WingGridService {
  constructor(
    @InjectRepository(WingGrid) private readonly repo: Repository<WingGrid>,
    private readonly validator: WingGridValidator,
    private readonly wingService: WingsService,
    private readonly gridCellsService: GridCellService,
    private readonly userService: UsersService,
    private readonly participateService: WingMembershipService,
  ) {}

  // Why fill the grid randomly with a bunch of users? It's supposed to be friendship based.

  // public async create(wingGridDto: CreateWingGridDto) {
  //   await this.validator.validateCreateWingGrid({
  //     wingGridName: wingGridDto.wingGridName,
  //   });
  //   const currentWing = await this.wingService.findOneById(wingGridDto.wingId);
  //
  //   const newWingGrid = this.repo.create({
  //     wingGridName: wingGridDto.wingGridName,
  //     rows: wingGridDto.rows,
  //     cols: wingGridDto.cols,
  //     wing: currentWing,
  //   });
  //
  //   await this.repo.save(newWingGrid);
  //
  //   let participate = await this.participateService.findByWing(currentWing);
  //   console.log(participate);
  //   let participateUserId: User[] = [];
  //   participate.forEach((participate) =>
  //     participateUserId.push(participate.userId),
  //   );

  //   console.log(participateUserId);
  //   /*const user = await this.userService.findManyByUsers(participateUserId);
  //
  //   let gridCell: CreateGridCellDto[] = [];
  //   for (let i = 0; i < user.length; ++i) {
  //     gridCell.push({
  //       gridCellName: user[j].firstName + ' ' + user[j].lastName,
  //       participate: participate[i],
  //       wingGrid: newWingGrid,
  //     });
  //   }
  //
  //   for (const cell of gridCell) {
  //     await this.gridCellsService.create(cell);
  //   }*/
  //
  //   return 'wing grid created successfully';
  // }
}
