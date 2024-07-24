import { ApiProperty } from '@nestjs/swagger';
import { IsNumber } from 'class-validator';

export class UsersFromWingDto {
  @ApiProperty()
  @IsNumber()
  wingId: number;
}
