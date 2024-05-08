import Address from '../user/Address.ts';
import Measurements from '../user/Measurements.ts';

export default interface SignupFormFields {
  firstName: string;
  lastName: string;
  birthdate: string;
  email: string;
  cpf: string;
  phoneNumber: string;
  address: Address;
  measurements: Measurements;
  password: string;
  confirmPassword?: string;
}
