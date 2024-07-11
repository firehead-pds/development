import { ApiProperty } from '@nestjs/swagger';
import { Wing } from '../../wings/wing.entity';
import { User } from '../../users/user.entity';
import { Role } from '../enums/participate-role';

export class ParticipateDto {
  @ApiProperty()
  wingId: Partial<Wing>;

  @ApiProperty()
  userId: Partial<User>;

  @ApiProperty()
  role: Role;
}
