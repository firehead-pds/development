import { IsEnum, IsString, Length, Matches, IsNotEmpty } from 'class-validator';
import { ShirtSize, PantsSize } from '../enums/measurements.enum';

export class CreateMeasurementsDto {
  @IsString()
  @Length(2, 2)
  @Matches(/^\d+$/, { message: 'Shoe size must contain only numbers' })
  shoeSize: string;

  @IsEnum(ShirtSize)
  shirtSize: ShirtSize;

  @IsEnum(PantsSize)
  pantsSize: PantsSize;

  @IsString()
  @Length(3, 3)
  @Matches(/^\d+$/, { message: 'Height must contain only numbers' })
  height: string;

  @IsNotEmpty()
  userId: number;
}
