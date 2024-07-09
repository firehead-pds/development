import { Role } from '../enums/participate-role';

interface wings {
  id: number;
  name: string;
  userRole: Role;
}

export interface ParticipateInfo {
  firstName: string;
  lastName: string;
  email: string;
  wingsInfo?: wings[];
}
