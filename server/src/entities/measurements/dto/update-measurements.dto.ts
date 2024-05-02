import { IsEnum, IsOptional, IsString, Length, Matches } from 'class-validator';
import { PantsSize, ShirtSize } from '../enums/measurements.enum';

export class UpdateMeasurementsDto {
  @IsOptional()
  @IsString()
  @Length(2, 2)
  @Matches(/^\d+$/, { message: 'Shoe size must contain only numbers' })
  shoeSize?: string;

  @IsOptional()
  @IsEnum(ShirtSize)
  shirtSize?: ShirtSize;

  @IsOptional()
  @IsEnum(PantsSize)
  pantsSize?: PantsSize;

  @IsOptional()
  @IsString()
  @Length(3, 3)
  @Matches(/^\d+$/, { message: 'Height must contain only numbers' })
  height?: string;
}
