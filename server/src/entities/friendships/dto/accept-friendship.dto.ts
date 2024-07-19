import { IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class AcceptFriendshipDto {
  @ApiProperty()
  @IsNumber()
  requestId: number;
}
