import {GridCell} from "../grid-cell.entity";
import {IsNotEmpty, IsNumber} from "class-validator";
import {Type} from "class-transformer";

export class UpdateWingGridDto {
   @IsNumber()
   wingId: number;

   @IsNumber()
   wingGridId: number;

   @IsNotEmpty()
   @Type(() => GridCell)
   cells: GridCell[];
}