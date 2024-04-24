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

  @IsObject()
  @ValidateNested()
  @Type(() => CreateMeasurementsDto)
  measurements: Measurements;

  @IsObject()
  @ValidateNested()
  @Type(() => CreateAddressDto)
  address: Address;
}
