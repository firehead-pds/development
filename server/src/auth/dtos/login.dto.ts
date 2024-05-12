import { IsEmail, IsString } from 'class-validator';

export default class LoginDto {
  @IsEmail()
  email: string;

  @IsString()
  password: string;
}
