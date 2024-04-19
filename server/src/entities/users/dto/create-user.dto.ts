import { IsEmail, IsString, IsInt, Length, Matches, IsDate } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateUserDTO {
  @IsString()
  @Length(1, 25)
  firstName: string;

  @IsString()
  @Length(1, 70)
  lastName: string;

  @IsDate()
  @Type(() => Date)
  birthDate: Date;

  @IsInt()
  age: number;

  @IsEmail()
  email: string;

  @IsString()
  @Length(5, 24)
  password: string;

  @IsString()
  @Length(10, 11)
  @Matches(/^\d+$/)
  phoneNumber: string;

  @IsString()
  @Length(11, 11)
  @Matches(/^\d+$/)
  cpf: string;
}
