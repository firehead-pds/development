import { ConflictException, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Users } from "../user.entity";
import { Repository } from "typeorm";
import { UpdateUserDto } from "../dto/update-user.dto";

@Injectable()
export class UsersValidator {
  constructor(@InjectRepository(Users) private repository: Repository<Users>) {
  }

  private async checkExistingEmail(email: string) {
    const queryBuilder = this.repository.createQueryBuilder("user");
    const exists = await queryBuilder
      .where("user.email = :email", { email })
      .getOne();

    return !!exists;
  }

  private async checkExistingCpf(cpf: string) {
    const queryBuilder = this.repository.createQueryBuilder("user");
    const exists = await queryBuilder
      .where("user.cpf = :cpf", { cpf })
      .getOne();

    return !!exists;
  }

  public async validateCreateUser(email: string, cpf: string) {
    const existsWithEmail = await this.checkExistingEmail(email);
    if (existsWithEmail) {
      throw new ConflictException(`email already in use`);
    }

    const existsWithCpf = await this.checkExistingCpf(cpf);
    if (existsWithCpf) {
      throw new ConflictException(`cpf already in use`);
    }
  }

  public async validateUserUpdate(
    userId: number,
    body: UpdateUserDto,
    currentUser: Users
  ): Promise<void> {
    if (body.cpf && body.cpf !== currentUser.cpf) {
      throw new ConflictException("CPF cannot be changed.");
    }

    if (body.email && body.email !== currentUser.email) {
      const existingUserWithEmail = await this.repository.findOne({
        where: { email: body.email }
      });

      if (existingUserWithEmail) {
        throw new ConflictException(
          "This email is already registered with another user."
        );
      }
    }
  }
}
