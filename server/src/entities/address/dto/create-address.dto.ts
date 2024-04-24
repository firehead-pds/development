import { IsNotEmpty, IsOptional, IsString, Length } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class CreateAddressDto {
  @IsNotEmpty()
  @IsString()
  @Length(8)
  postalCode: string;

  @IsNotEmpty()
  @IsString()
  @Length(1, 70)
  addressLine: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @Length(1, 4)
  addressNumber: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  @Length( 0, 20)
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
