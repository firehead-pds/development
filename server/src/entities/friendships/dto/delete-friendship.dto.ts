import { IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class DeleteFriendshipDto {
  @ApiProperty()
  @IsNumber()
  friendId: number;
}
