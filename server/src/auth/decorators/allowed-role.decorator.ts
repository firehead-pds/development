import { Role } from '../../entities/wings/enums/participate-role';
import { Reflector } from '@nestjs/core';

export const AllowedRole = Reflector.createDecorator<Role>();
