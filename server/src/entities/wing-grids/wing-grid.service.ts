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
    const queryRunner = this.dataSource.createQueryRunner();
    const { rows, cols, wingGridName, wingId } = wingGridDto;

    const wing = await this.wingService.findOneById(wingId);

    if (!wing) {
      throw new NotFoundException('Could not find wing with given ID');
    }

    let usersInWing = await this.wingMembershipService.getAllUsersForWing(
      wing.id,
    );

    let grid = this.wingGridRepository.create({
      wing,
      name: wingGridName,
      rows,
      cols,
    });

    grid = await queryRunner.manager.save(grid);

    const cells: GridCell[] = [];

    const middle = Math.floor(rows / 2);

    for (let currentRow = 1; currentRow <= rows; currentRow++) {
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

      let hasLeft = currentLeft >= 1;
      let hasRight = currentRight <= cols;

      while (hasLeft || hasRight) {
        if (hasLeft) {
          let leftUserToAdd = null;

          const friendCell = cells.find(
            (c) => c.row === currentRow && c.col === currentLeft + 1,
          );

          let friendCloseToLeft = friendCell ? friendCell.user : null;

          Logger.debug(
            friendCloseToLeft ? friendCloseToLeft.firstName : 'No one',
          );

          if (friendCloseToLeft) {
            const leftUserFriends =
              await this.friendshipsService.getAllFriends(friendCloseToLeft);

            Logger.debug(`Found ${leftUserFriends.length} friends`);

            if (leftUserFriends.length > 0) {
              for (const friend of leftUserFriends) {
                const friendIsInGrid = cells.find(
                  (c) => c.user.id === friend.id,
                );
                if (!friendIsInGrid) {
                  leftUserToAdd = friend;
                  usersInWing = usersInWing.filter(
                    (u) => u.id !== leftUserToAdd.id,
                  );
                  break;
                }
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
          hasLeft = currentLeft >= 1;
        }

        if (hasRight) {
          let rightUserToAdd = null;

          const friendCell = cells.find(
            (c) => c.row === currentRow && c.col == currentRight - 1,
          );

          let friendCloseToRight = friendCell ? friendCell.user : null;

          Logger.debug(
            friendCloseToRight ? friendCloseToRight.firstName : 'No one',
          );

          if (friendCloseToRight) {
            const rightUserFriends =
              await this.friendshipsService.getAllFriends(friendCloseToRight);

            Logger.debug(`Found ${rightUserFriends.length} friends`);

            if (rightUserFriends.length > 0) {
              for (const friend of rightUserFriends) {
                const friendIsInGrid = cells.find(
                  (c) => c.user.id === friend.id,
                );
                if (!friendIsInGrid) {
                  rightUserToAdd = friend;
                  usersInWing = usersInWing.filter(
                    (u) => u.id !== rightUserToAdd.id,
                  );
                  break;
                }
              }
            }

            if (!rightUserToAdd) {
              rightUserToAdd = usersInWing.shift();
            }
          }

          const rightGridCell = this.gridCellRepository.create({
            row: currentRow,
            col: currentRight,
            user: rightUserToAdd,
            wingGrid: grid,
          });

          cells.push(rightGridCell);

          ++currentRight;
          hasRight = currentRight <= grid.cols;
        }
      }
    }

    try {
      await queryRunner.connect();
      await queryRunner.startTransaction();

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
