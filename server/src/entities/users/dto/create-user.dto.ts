import {
  IsEmail,
  IsString,
  Length,
  Matches,
  IsDate,
  IsObject, ValidateNested
} from "class-validator";
import { Type } from 'class-transformer';
import { Address } from '../../address/address.entity';
import { Measurements } from '../../measurements/measurements.entity';
import { CreateMeasurementsDto } from "../../measurements/dto/create-measurements.dto";
import { CreateAddressDto } from "../../address/dto/create-address.dto";
import { ApiProperty } from "@nestjs/swagger";

export class CreateUserDto {
  @ApiProperty()
  @IsString()
  @Length(1, 25)
  firstName: string;

  @ApiProperty()
  @IsString()
  @Length(1, 70)
  lastName: string;

  @ApiProperty()
  @IsDate()
  @Type(() => Date)
  birthdate: Date;

  @ApiProperty()
  @IsEmail()
  email: string;

  @ApiProperty()
  @IsString()
  @Length(5, 24)
  password: string;

  @ApiProperty()
  @IsString()
  @Length(10, 11)
  @Matches(/^\d+$/)
  phoneNumber: string;

  @IsString()
  @Length(11, 11)
  @Matches(/^\d+$/)
  cpf: string;

  @ApiProperty({type: CreateMeasurementsDto})
  @IsObject()
  @ValidateNested()
  @Type(() => CreateMeasurementsDto)
  measurements: Measurements;

  @ApiProperty({type: CreateAddressDto})
  @IsObject()
  @ValidateNested()
  @Type(() => CreateAddressDto)
  address: Address;
}
