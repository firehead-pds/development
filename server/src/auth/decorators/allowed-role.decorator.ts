import { SetMetadata } from '@nestjs/common';
import { Role } from '../../entities/wings/enums/participate-role';

export const AllowedRole = (role: Role) => SetMetadata('allowedRole', role);
