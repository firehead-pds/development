import { ApiProperty } from '@nestjs/swagger';

export class CreateInviteCodeDto {
  @ApiProperty()
  wingId: number;
}
