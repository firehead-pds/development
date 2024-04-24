import { IsNotEmpty, IsString, Length } from 'class-validator';

export class CreateAddressDto {
  @IsNotEmpty()
  @IsString()
  @Length(8)
  postalCode: string;

  @IsNotEmpty()
  @IsString()
  @Length(1, 70)
  addressLine: string;

  @IsNotEmpty()
  @IsString()
  @Length(1, 4)
  addressNumber: string;

  @IsNotEmpty()
  @IsString()
  @Length(1, 20)
  complement: string;

  @IsNotEmpty()
  @IsString()
  @Length(1, 30)
  district: string;

  @IsNotEmpty()
  @IsString()
  @Length(1, 30)
  city: string;

  @IsNotEmpty()
  @IsString()
  @Length(1, 30)
  state: string;
}
