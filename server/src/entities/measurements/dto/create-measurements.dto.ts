import { IsEnum, IsString, Length, Matches } from 'class-validator';
import { ShirtSize } from '../enums/measurements-shirt-size';
import { PantsSize } from '../enums/measurements-pants-size';
import { ApiProperty } from '@nestjs/swagger';

export class CreateMeasurementsDto {
  @ApiProperty()
  @IsString()
  @Length(2, 2)
  @Matches(/^\d+$/, { message: 'Shoe size must contain only numbers' })
  shoeSize: string;

  @ApiProperty()
  @IsEnum(ShirtSize)
  shirtSize: ShirtSize;

  @ApiProperty()
  @IsEnum(PantsSize)
  pantsSize: PantsSize;

  @ApiProperty()
  @IsString()
  @Length(3, 3)
  @Matches(/^\d+$/, { message: 'Height must contain only numbers' })
  height: string;
}
