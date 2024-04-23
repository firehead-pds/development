import { ShirtSize, PantsSize } from '../enums/measurements.enum';
import IUser from '../../users/interfaces/IUser';

export default interface IMeasurements {
  shoeSize: string;
  shirtSize: ShirtSize;
  pantsSize: PantsSize;
  height: string;
  user?: IUser;
}
