import { IsString, Length } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class WingDto {
  @ApiProperty()
  @IsString()
  @Length(1, 70)
  name: string;
}
