import { IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateFriendshipDto {
  @ApiProperty()
  @IsNumber()
  receiverId: number;
}
