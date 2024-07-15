import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Wing } from './wing.entity';
import { WingsValidator } from './validators/wings.validator';
import { WingDto } from './dtos/wing.dto';
import { WingMembershipService } from './wing-membership.service';
import { User } from '../users/user.entity';
import { WingMembership } from './wing-membership.entity';
import { Role } from './enums/participate-role';

@Injectable()
/**
 * @class WingsService
 * Manages the core details and configuration of a Wing, including its name, description, and associated settings.
 * This class does not handle information related to the members of the Wing.
 */
export class WingsService {
  constructor(
    @InjectRepository(Wing) private readonly repo: Repository<Wing>,
    @InjectRepository(WingMembership)
    private readonly wingMembershipRepo: Repository<WingMembership>,
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
      const newMembership = this.wingMembershipRepo.create({
        user: user,
        wing: newWing,
        role: Role.WingChief,
      });

      await queryRunner.manager.save(newWing);
      await queryRunner.manager.save(newMembership);

      await queryRunner.commitTransaction();
      return { id: newWing.id };
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
