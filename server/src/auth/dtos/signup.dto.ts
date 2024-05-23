import {
  IsDate,
  IsEmail,
  IsObject,
  IsString,
  Length,
  Matches,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { IsAdult } from '../../common/decorators/validation/is-adult.decorator';
import { IsCpf } from '../../common/decorators/validation/is-cpf.decorator';
import { CreateMeasurementsDto } from '../../entities/measurements/dto/create-measurements.dto';
import { Measurements } from '../../entities/measurements/measurements.entity';
import { CreateAddressDto } from '../../entities/address/dto/create-address.dto';
import { Address } from '../../entities/address/address.entity';

export class SignupDto {
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
  @IsAdult()
  birthdate: Date;

  @ApiProperty()
  @IsEmail()
  email: string;

  @ApiProperty()
  @IsString()
  @Length(8, 24)
  //Checks if there is at least:
  // - a lowercase letter
  // - an uppercase letter
  // - a number
  // - a symbol
  @Matches(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!"#$%&'()*+,-./:;<=>?@[\]^_`{|}~]).{8,24}$/,
  )
  password: string;

  @ApiProperty()
  @IsString()
  @Length(10, 11)
  @Matches(/^\d+$/)
  phoneNumber: string;

  @IsString()
  @Length(11, 11)
  @IsCpf()
  cpf: string;

  @ApiProperty({ type: CreateMeasurementsDto })
  @IsObject()
  @ValidateNested()
  @Type(() => CreateMeasurementsDto)
  measurements: Measurements;

  @ApiProperty({ type: CreateAddressDto })
  @IsObject()
  @ValidateNested()
  @Type(() => CreateAddressDto)
  address: Address;
}
