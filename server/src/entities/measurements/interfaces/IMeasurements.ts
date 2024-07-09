import { ShirtSize } from '../enums/measurements-shirt-size';
import { PantsSize } from '../enums/measurements-pants-size';
import IUser from '../../users/interfaces/IUser';

export default interface IMeasurements {
  shoeSize: string;
  shirtSize: ShirtSize;
  pantsSize: PantsSize;
  height: string;
  user?: IUser;
}
