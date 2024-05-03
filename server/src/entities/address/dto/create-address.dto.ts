import {
  IsNotEmpty,
  IsOptional,
  IsPostalCode,
  IsString,
  Length,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateAddressDto {
  @IsNotEmpty()
  @IsString()
  @Length(8)
  @IsPostalCode('BR')
  postalCode: string;

  @IsNotEmpty()
  @IsString()
  @Length(1, 70)
  addressLine: string;

  @ApiProperty()
  @IsOptional()
  @IsNotEmpty()
  @IsString()
  @Length(1, 4)
  addressNumber: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  @Length(0, 20)
  complement: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @Length(1, 30)
  district: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @Length(1, 30)
  city: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @Length(1, 30)
  state: string;
}
