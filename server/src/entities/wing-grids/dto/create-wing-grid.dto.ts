import { IsString, IsInt, MaxLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateWingGridDto {
  @ApiProperty()
  @IsString()
  @MaxLength(70)
  wingGridName: string;

  @ApiProperty()
  @IsInt()
  rows: number;

  @ApiProperty()
  @IsInt()
  cols: number;

  @ApiProperty()
  @IsInt()
  wingId: number;
}
