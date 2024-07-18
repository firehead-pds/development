import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsEmail, IsNumber, IsString } from 'class-validator';
import { Role } from '../../entities/wings/enums/participate-role';
import { Exclude, Expose } from 'class-transformer';

@Exclude()
class WingsInfo {
  @Expose()
  @ApiProperty()
  @IsNumber()
  id: number;

  @Expose()
  @ApiProperty()
  @IsString()
  userRole: Role;
}

@Exclude()
export default class LoginResponseDto {
  @Expose()
  @ApiProperty()
  @IsString()
  firstName: string;

  @Expose()
  @ApiProperty()
  @IsString()
  lastName: string;

  @Expose()
  @ApiProperty()
  @IsEmail()
  email: string;

  @Expose()
  @ApiProperty()
  @IsArray()
  wingsInfo: WingsInfo[];
}
