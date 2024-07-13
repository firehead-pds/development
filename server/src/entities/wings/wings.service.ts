import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Wing } from './wing.entity';
import { WingsValidator } from './validators/wings.validator';
import { WingDto } from './dtos/wing.dto';
import { WingMembershipService } from './wing-membership.service';
import { Role } from './enums/participate-role';
import { RequestUser } from '../../auth/types/request-user.type';
import { User } from '../users/user.entity';

@Injectable()
/**
 * @class WingsService
 * Manages the core details and configuration of a Wing, including its name, description, and associated settings.
 * This class does not handle information related to the members of the Wing.
 */
export class WingsService {
  constructor(
    @InjectRepository(Wing) private readonly repo: Repository<Wing>,
    private readonly validator: WingsValidator,
    private readonly wingMembershipService: WingMembershipService,
    private readonly dataSource: DataSource,
  ) {}

  /** Creates a new wing, setting passed user as the chief.
   * @param wingDto The properties of the wing to create.
   * @param user The user who is creating the wing and will be set as chief. Preferably use the currently logged-in user.
   * @throws ConflictException if a wing with the given name already exists.
   * */
  public async create(wingDto: WingDto, user: User) {
    // Validate wing data, check if fields are correct and do not already exist in the database
    await this.validator.validateCreateWing({ name: wingDto.wingName });

    // Run this as a transaction. Prevent a wing from being created without a chief
    // or a chief from being created without an existing wing.
    const queryRunner = this.dataSource.createQueryRunner();

    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      // Save new wing to the database
      const newWing = this.repo.create({ name: wingDto.wingName });
      await this.repo.save(newWing);

      // Create new member in the wing with the role of chief
      await this.wingMembershipService.addUserToWing(
        user,
        newWing,
        Role.WingChief,
      );

      return 'wing created successfully';
    } catch (ex) {
      await queryRunner.rollbackTransaction();
    } finally {
      await queryRunner.release();
    }
  }

  public async findOneById(id: number) {
    return await this.repo.findOneBy({ id });
  }
}
