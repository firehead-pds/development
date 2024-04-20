import Address from "./Address.ts";
import Measurements from "./Measurements.ts";

export default interface UserInfo {
  firstName: string;
  lastName: string;
  birthdate: string;
  email: string;
  cpf: string;
  phone: string;
  address?: Address;
  measurements?: Measurements;
}
