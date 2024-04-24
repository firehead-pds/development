import IUser from "./IUser";
import IAddress from "../../address/interfaces/IAddress";
import IMeasurements from "../../measurements/interfaces/IMeasurements";

export default interface ICreateUserData extends IUser {
  address: IAddress,
  measurements: IMeasurements
}