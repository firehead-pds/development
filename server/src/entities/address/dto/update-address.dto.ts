import { IsOptional, IsString, Length } from 'class-validator';

export class UpdateAddressDto {
  @IsOptional()
  @IsString()
  @Length(8)
  postalCode?: string;

  @IsOptional()
  @IsString()
  @Length(1, 70)
  addressLine?: string;

  @IsOptional()
  @IsString()
  @Length(1, 4)
  addressNumber?: string;

  @IsOptional()
  @IsString()
  @Length(1, 20)
  complement?: string;

  @IsOptional()
  @IsString()
  @Length(1, 30)
  district?: string;

  @IsOptional()
  @IsString()
  @Length(1, 30)
  city?: string;

  @IsOptional()
  @IsString()
  @Length(1, 30)
  state?: string;

  @IsOptional()
  userId?: number;
}
