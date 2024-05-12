import { UsersMethods } from './users/UsersMethods.ts';
import { ContactUsMethods } from './contact-us/ContactUsMethods.ts';
import { LogInMethods } from './auth/LogInMethods.ts';

export type Endpoints = {
  users: UsersMethods;
  'contact-us': ContactUsMethods;
  'log-in': LogInMethods;
};
