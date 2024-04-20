import Address from "../../../user/Address.ts";
import Measurements from "../../../user/Measurements.ts";

export default interface PostUsers {
  firstName: string;
  lastName: string;
  birthdate: string;
  email: string;
  password: string;
  cpf: string;
  phone: string;
  measurements: Measurements;
  address: Address;
}
