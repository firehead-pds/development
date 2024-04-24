import {
  IsOptional,
  IsString,
  IsEmail,
  Length,
  Matches,
  IsInt,
  IsDate,
  Min,
} from 'class-validator';
import { Type } from 'class-transformer';

export class UpdateUserDto {
  @IsOptional()
  @IsString()
  @Length(1, 25)
  firstName?: string;

  @IsOptional()
  @IsString()
  @Length(1, 70)
  lastName?: string;

  @IsOptional()
  @Type(() => Date)
  @IsDate()
  birthdate?: Date;

  @IsOptional()
  @IsInt()
  @Min(0)
  age?: number;

  @IsOptional()
  @IsEmail()
  @Length(1, 70)
  email?: string;

  @IsOptional()
  @IsString()
  @Length(5, 24)
  password?: string;

  @IsOptional()
  @IsString()
  @Length(10, 11)
  phoneNumber?: string;

  @IsOptional()
  @Matches(/^\d{11}$/, { message: 'CPF must be an 11-digit number' })
  cpf?: string;
}
