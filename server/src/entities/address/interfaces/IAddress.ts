import IUser from "../../users/interfaces/IUser";

export default interface IAddress {
  postalCode?: string;
  addressLine?: string;
  district?: string;
  city?: string;
  state?: string;
  addressNumber?: string;
  complement?: string | null;
  user?: IUser;
}
