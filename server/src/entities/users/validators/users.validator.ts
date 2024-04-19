import { Injectable, ConflictException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Users } from '../user.entity';
import { Repository } from 'typeorm';
import { UpdateUserDto } from '../dto/update-user.dto';

@Injectable()
export class UsersValidator {
  constructor(@InjectRepository(Users) private repository: Repository<Users>) {}

  public async checkForDuplicateCpfOrEmail(cpf: string, email: string, id?: number): Promise<void> {
    const queryBuilder = this.repository.createQueryBuilder('user');

    if (id) {
      queryBuilder.andWhere('user.id != :id', { id });
    }

    queryBuilder
      .where('user.cpf = :cpf', { cpf })
      .orWhere('user.email = :email', { email });

    const existingUser = await queryBuilder.getOne();

    if (existingUser) {
      if (existingUser.cpf === cpf) {
        throw new ConflictException(`CPF is already registered.`);
      }
      if (existingUser.email === email) {
        throw new ConflictException(`E-mail is already registered.`);
      }
    }
  }

  public async validateUserUpdate(
    userId: number,
    body: UpdateUserDto,
    currentUser: Users
  ): Promise<void> {

    if (body.cpf && body.cpf !== currentUser.cpf) {
      throw new ConflictException('CPF cannot be changed.');
    }

    if (body.email && body.email !== currentUser.email) {
      const existingUserWithEmail = await this.repository.findOne({
        where: { email: body.email }
      });

      if (existingUserWithEmail) {
        throw new ConflictException('This email is already registered with another user.');
      }
    }
  }


}