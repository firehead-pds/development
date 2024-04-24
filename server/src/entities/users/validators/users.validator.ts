import { ConflictException, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "../user.entity";
import { Repository } from "typeorm";
import { UpdateUserDto } from "../dto/update-user.dto";

@Injectable()
export class UsersValidator {
  constructor(@InjectRepository(User) private repo: Repository<User>) {
  }

  public async validateCreateUser(newUser: Partial<User>) {
    const existsWithEmail = await this.checkExistingEmail(newUser.email);
    if (existsWithEmail) {
      throw new ConflictException(`email already in use`);
    }

    const existsWithCpf = await this.checkExistingCpf(newUser.email);
    if (existsWithCpf) {
      throw new ConflictException(`cpf already in use`);
    }
  }

  public async validateUserUpdate(
    userId: number,
    body: UpdateUserDto,
    currentUser: User
  ): Promise<void> {
    if (body.cpf && body.cpf !== currentUser.cpf) {
      throw new ConflictException("CPF cannot be changed.");
    }

    if (body.email && body.email !== currentUser.email) {
      const existingUserWithEmail = await this.repo.findOne({
        where: { email: body.email }
      });

      if (existingUserWithEmail) {
        throw new ConflictException(
          "This email is already registered with another user."
        );
      }
    }
  }

  private async checkExistingEmail(email: string) {
    const exists = await this.repo.findOneBy({ email });
    return !!exists;
  }

  private async checkExistingCpf(cpf: string) {
    const exists = await this.repo.findOneBy({ cpf });
    return !!exists;
  }
}
