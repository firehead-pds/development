import { Injectable, NotFoundException } from "@nestjs/common";
import { Repository } from "typeorm";
import { User } from "./user.entity";
import { UsersValidator } from "./validators/users.validator";
import { InjectRepository } from "@nestjs/typeorm";
import IUser from "./interfaces/IUser";

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly repo: Repository<User>,
    private readonly validator: UsersValidator
  ) {
  }

  public async create(
    user: Partial<User>
  ) {
    await this.validator.validateCreateUser(user);

    const newUser = this.repo.create(user);
    await this.repo.save(newUser);

    return "user created successfully";
  }

  public async findAll(): Promise<User[]> {
    return this.repo.find();
  }

  public async findOne(id: number): Promise<User> {
    const user = await this.repo.findOne({ where: { id } });

    if (!user) {
      throw new NotFoundException(`No users found.`);
    }

    return user;
  }

  public async update(id: number, body: IUser): Promise<User> {
    const user = await this.repo.findOne({ where: { id } });

    if (!user) {
      throw new NotFoundException(`No users found.`);
    }

    await this.validator.validateUserUpdate(id, body, user);

    await this.repo.update({ id }, body);

    return this.repo.findOne({ where: { id } });
  }

  public async delete(id: number): Promise<string> {
    const user = await this.repo.findOne({ where: { id } });

    if (!user) {
      throw new NotFoundException(`No users found.`);
    }

    await this.repo.delete(id);

    return "User successfully deleted";
  }
}
