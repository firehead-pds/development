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
import { Address } from '../../address/address.entity';
import { Measurements } from '../../measurements/measurements.entity';
import { CreateMeasurementsDto } from '../../measurements/dto/create-measurements.dto';
import { CreateAddressDto } from '../../address/dto/create-address.dto';
import { ApiProperty } from '@nestjs/swagger';
import { IsCpf } from '../../../common/decorators/validation/is-cpf.decorator';
import { IsAdult } from '../../../common/decorators/validation/is-adult.decorator';

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
  @IsAdult()
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
