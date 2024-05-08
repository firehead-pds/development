import { UsersMethods } from './users/UsersMethods.ts';
import { ContactUsMethods } from './contact-us/ContactUsMethods.ts';

export type Endpoints = {
  users: UsersMethods;
  'contact-us': ContactUsMethods;
};
