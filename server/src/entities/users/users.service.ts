import { Body, ConflictException, Injectable, NotFoundException, Param, ParseIntPipe } from '@nestjs/common';
import { Repository } from 'typeorm';
import { CreateUserDTO } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Users } from './user.entity';
import { UsersValidator } from './validators/users.validator';
import { UsersRepository } from './users.repository';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UsersService {
  constructor(@InjectRepository(Users) private readonly repository: UsersRepository, private readonly validator: UsersValidator) {}


  public async create(
    @Body() body: CreateUserDTO): Promise<Users> {

    await this.validator.checkForDuplicateCpfOrEmail(body.cpf, body.email);

    return this.repository.save(body);
  }


  public async findAll(): Promise<Users[]> {

    return this.repository.find();
  }


  public async findOne(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<Users> {
    const user = await this.repository.findOne({ where: { id } });

    if (!user) {
      throw new NotFoundException(`No users found.`);
    }

    return user;
  }


  public async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: UpdateUserDto,
  ): Promise<Users> {
    const user = await this.repository.findOne({ where: { id } });

    if (!user) {
      throw new NotFoundException(`No users found.`);
    }

    await this.validator.validateUserUpdate(id, body, user);

    await this.repository.update({ id }, body);

    return this.repository.findOne({ where: { id } });
  }


  public async delete(@Param('id', ParseIntPipe) id: number): Promise<string> {
    const user = await this.repository.findOne({ where: { id } });

    if (!user) {
      throw new NotFoundException(`No users found.`);
    }

    await this.repository.delete(id);

    return 'User successfully deleted';
  }
}
