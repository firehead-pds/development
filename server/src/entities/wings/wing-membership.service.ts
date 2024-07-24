import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Repository } from 'typeorm';
import { WingMembership } from './wing-membership.entity';
import { Role } from './enums/participate-role';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../users/user.entity';
import { Wing } from './wing.entity';
import { RequestUser } from '../../auth/types/request-user.type';
import { CreateInviteCodeDto } from './dtos/create-invite-code.dto';
import { v4 as uuid4 } from 'uuid';
import { Invite } from './invite.entity';

/**
 * @class WingMembershipService
 * Manages the membership relationships between users and wings, including adding users to wings, retrieving
 * a user's wing affiliations, and validating membership conditions.
 */
@Injectable()
export class WingMembershipService {
  constructor(
    @InjectRepository(Wing)
    private readonly wingRepository: Repository<Wing>,
    @InjectRepository(WingMembership)
    private readonly wingMembershipRepository: Repository<WingMembership>,
    @InjectRepository(Invite)
    private readonly inviteRepository: Repository<Invite>,
  ) {}

  /**
   * Adds a user to an existing wing with the specified role.
   *
   * @param user The user to be added to the wing.
   * @param wing The wing to which the user will be added.
   * @param role The role the user will have in the wing.
   * @throws ConflictException If the user is already a member of the wing or if the wing already has a chief and the specified role is WingChief.
   */
  public async addUserToWing(user: User, wing: Wing, role: Role) {
    const alreadyInWing = await this.validateUserAlreadyInWing(user, wing);

    if (alreadyInWing) {
      throw new ConflictException('This user is already part of this wing');
    }

    if (
      role == Role.WingChief &&
      (await this.validateWingAlreadyHasChief(wing))
    ) {
      throw new ConflictException(
        'Cannot add chief. Wing already has a chief.',
      );
    }

    const membership: Partial<WingMembership> = {
      wing,
      user,
      role,
      rating: 0,
    };

    const newMembership = this.wingMembershipRepository.create(membership);
    await this.wingMembershipRepository.save(newMembership);
  }

  /**
   * Retrieves all wings that a user is a part of.
   *
   * @param user The user whose wings are to be retrieved.
   * @returns A Promise resolving to an array of Wing entities that the user is a member of.
   */
  public async getWingsForUser(user: User) {
    return this.wingMembershipRepository
      .createQueryBuilder('membership')
      .leftJoinAndSelect('membership.wing', 'wing')
      .where('membership.user = :user', { user })
      .getMany();
  }

  /**
   * Validates whether a user is already a member of a specific wing.
   *
   * @param user The user to check.
   * @param wing The wing to check.
   * @returns A Promise resolving to `true` if the user is already a member of the wing, `false` otherwise.
   */
  private async validateUserAlreadyInWing(user: User, wing: Wing) {
    return await this.wingMembershipRepository.existsBy({ user, wing });
  }

  /**
   * Validates whether a wing already has a chief.
   *
   * @param wing The wing to check.
   * @returns A Promise resolving to `true` if the wing already has a chief, `false` otherwise.
   */
  private async validateWingAlreadyHasChief(wing: Wing) {
    return await this.wingMembershipRepository.existsBy({
      wing,
      role: Role.WingChief,
    });
  }

  public async generateInviteCode(body: CreateInviteCodeDto) {
    const wing = await this.wingRepository.findOneBy({ id: body.wingId });

    if (!wing) throw new NotFoundException('Wing not found.');

    const token = uuid4();

    const expiresAt = new Date();
    expiresAt.setHours(expiresAt.getHours() + 24);

    const invite = this.inviteRepository.create({
      token,
      wing,
      expiresAt,
    });

    await this.inviteRepository.save(invite);

    return token;
  }

  public async joinInvite(token: string, user: RequestUser) {
    const invite = await this.inviteRepository.findOne({
      where: { token },
      relations: ['wing'],
    });

    if (!invite || invite.expiresAt < new Date())
      throw new NotFoundException('Invite not found or expired.');

    const { wing } = invite;

    await this.addUserToWing(user, wing, Role.Component);
  }

  public async validateInvite(token: string) {
    const invite = await this.inviteRepository.findOne({
      where: { token },
      relations: ['wing'],
    });

    if (!invite || invite.expiresAt < new Date())
      throw new NotFoundException('Invite not found or expired.');

    return invite.wing;
  }

  public async getAllUsersForWing(wingId: number) {
    let memberships = await this.wingMembershipRepository
      .createQueryBuilder('wingMembership')
      .leftJoinAndSelect('wingMembership.user', 'user')
      .leftJoinAndSelect('wingMembership.wing', 'wing')
      .where('wing.id = :id', { id: wingId })
      .where('wing.id = :id', { id: wingId })
      .getMany();

    memberships = memberships.filter((wm) => wm.role === Role.Component);
    return memberships.map((wm) => wm.user);
  }
}
