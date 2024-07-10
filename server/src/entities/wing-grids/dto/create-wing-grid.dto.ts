import { IsString, IsInt, MaxLength, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateWingGridDto {
  @ApiProperty()
  @IsString()
  @MaxLength(70)
  name: string;

  @ApiProperty()
  @IsInt()
  rows: number;

  @ApiProperty()
  @IsInt()
  cols: number;

  @ApiProperty()
  @IsOptional()
  @IsInt()
  wingId?: number;
}
