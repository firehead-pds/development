import { FieldError } from 'react-hook-form';

export default interface LoginFormFields {
  email: string;
  password: string;
  invalidCredentialsError?: FieldError;
}
