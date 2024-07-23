import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { WingGrid } from './wing-grid.entity';
import { WingsService } from '../wings/wings.service';
import { WingMembershipService } from '../wings/wing-membership.service';
import { CreateWingGridDto } from './dto/create-wing-grid.dto';
import { GridCell } from './grid-cell.entity';
import { FriendshipsService } from '../friendships/friendships.service';

@Injectable()
export class WingGridService {
  constructor(
    @InjectRepository(WingGrid)
    private readonly wingGridRepository: Repository<WingGrid>,
    @InjectRepository(GridCell)
    private readonly gridCellRepository: Repository<GridCell>,
    private readonly wingService: WingsService,
    private readonly wingMembershipService: WingMembershipService,
    private readonly friendshipsService: FriendshipsService,
    private readonly dataSource: DataSource,
  ) {}

  public async create(wingGridDto: CreateWingGridDto) {
    const wing = await this.wingService.findOneById(wingGridDto.wingId);

    if (!wing) {
      throw new NotFoundException('Could not find wing with given ID');
    }
    const { rows, cols, wingGridName } = wingGridDto;

    const userInWing = await this.wingMembershipService.getAllUsersForWing(
      wing.id,
    );

    const grid = this.wingGridRepository.create({
      wing,
      name: wingGridName,
      rows,
      cols,
    });

    const cells: GridCell[] = [];

    const middle = Math.ceil(rows / 2);

    for (let currentRow = 0; currentRow < rows; currentRow++) {
      let hasLeft = true;
      let hasRight = true;

      const middleUser = userInWing.shift() || null;

      const middleGridCell = this.gridCellRepository.create({
        row: currentRow,
        col: middle,
        user: middleUser,
        wingGrid: grid,
      });

      cells.push(middleGridCell);

      let currentLeft = middle - 1;
      let currentRight = middle + 1;

      while (hasLeft && hasRight) {
        // Fill left
        if (hasLeft) {
          const friendCloseToLeft = cells.find(
            (c) => c.row === currentRow && c.col == currentLeft + 1,
          ).user;

          const leftUserFriends =
            await this.friendshipsService.getAllFriends(friendCloseToLeft);

          let leftUserToAdd = null;

          for (const friend of leftUserFriends) {
            leftUserToAdd = cells.find((c) => c.user.id === friend.id);
            if (leftUserToAdd) break;
          }

          const leftGridCell = this.gridCellRepository.create({
            row: currentRow,
            col: currentLeft,
            user: leftUserToAdd,
            wingGrid: grid,
          });

          cells.push(leftGridCell);

          --currentLeft;
          hasLeft = currentLeft >= grid.cols;
        }

        if (hasRight) {
          const friendCloseToRight = cells.find(
            (c) => c.row === currentRow && c.col == currentRight + 1,
          ).user;

          const rightUserFriends =
            await this.friendshipsService.getAllFriends(friendCloseToRight);

          let rightUserToAdd = null;

          for (const friend of rightUserFriends) {
            rightUserToAdd = cells.find((c) => c.user.id === friend.id);
            if (rightUserToAdd) break;
          }

          const rightGridCell = this.gridCellRepository.create({
            row: currentRow,
            col: currentLeft,
            user: rightUserToAdd,
            wingGrid: grid,
          });

          cells.push(rightGridCell);

          --currentRight;
          hasRight = currentRight >= grid.cols;
        }
      }
    }

    try {
      const queryRunner = this.dataSource.createQueryRunner();
      await queryRunner.connect();
      await queryRunner.startTransaction();

      await queryRunner.manager.save(grid);
      await queryRunner.manager.save(cells);
    } catch (e) {
      Logger.error(e);
    }

    return { id: grid.id };
  }
}
