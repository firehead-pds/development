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
    const { rows, cols, wingGridName, wingId } = wingGridDto;

    const wing = await this.wingService.findOneById(wingId);

    if (!wing) {
      throw new NotFoundException('Could not find wing with given ID');
    }

    const usersInWing = await this.wingMembershipService.getAllUsersForWing(
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

      const middleUser = usersInWing.shift() || null;

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
          let leftUserToAdd = null;

          const friendCloseToLeft = cells.find(
            (c) => c.row === currentRow && c.col == currentLeft + 1,
          ).user;

          if (friendCloseToLeft) {
            const leftUserFriends =
              await this.friendshipsService.getAllFriends(friendCloseToLeft);

            for (const friend of leftUserFriends) {
              leftUserToAdd = cells.find((c) => c.user.id === friend.id);
              if (leftUserToAdd) {
                usersInWing.filter((u) => u.id === leftUserToAdd.id);
                break;
              }
            }
          }

          if (!leftUserToAdd) {
            leftUserToAdd = usersInWing.shift();
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
          let rightUserToAdd = null;

          const friendCloseToRight = cells.find(
            (c) => c.row === currentRow && c.col == currentRight - 1,
          ).user;

          if (friendCloseToRight) {
            const rightUserFriends =
              await this.friendshipsService.getAllFriends(friendCloseToRight);

            for (const friend of rightUserFriends) {
              rightUserToAdd = cells.find((c) => c.user.id === friend.id);
              if (rightUserToAdd) {
                usersInWing.filter((u) => u.id === rightUserToAdd.id);
                break;
              }
            }
          }

          if (!rightUserToAdd) {
            rightUserToAdd = usersInWing.shift();
          }

          const rightGridCell = this.gridCellRepository.create({
            row: currentRow,
            col: currentRight,
            user: rightUserToAdd,
            wingGrid: grid,
          });

          cells.push(rightGridCell);

          --currentRight;
          hasLeft = currentRight >= grid.cols;
        }
      }
    }

    const queryRunner = this.dataSource.createQueryRunner();

    try {
      await queryRunner.connect();
      await queryRunner.startTransaction();

      await queryRunner.manager.save(grid);
      await queryRunner.manager.save(cells);

      await queryRunner.commitTransaction();
    } catch (e) {
      await queryRunner.rollbackTransaction();
      Logger.error(e);
    } finally {
      await queryRunner.release();
    }

    return { id: grid.id };
  }

  public async getWingGrid(id: number) {
    const wingGrid = await this.wingGridRepository.findOne({
      where: { id },
      relations: {
        gridCells: {
          user: true,
        },
      },
    });

    if (!wingGrid) {
      throw new NotFoundException('No wing grid found for the given ID');
    }

    // const grid = Array.from({ length: wingGrid.rows }, () =>
    //   Array.from({ length: wingGrid.cols }, () => null),
    // );
    //
    // wingGrid.gridCells.forEach((cell) => {
    //   grid[cell.row][cell.col] = cell;
    // });

    return wingGrid;
  }
}
