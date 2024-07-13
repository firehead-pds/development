import { IsString, IsInt, MaxLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { WingMembership } from '../../wings/wing-membership.entity';
import { WingGrid } from '../../wing-grids/wing-grid.entity';

export class CreateGridCellDto {
  @ApiProperty()
  @IsString()
  @MaxLength(70)
  gridCellName: string;

  @ApiProperty()
  @IsInt()
  participate: WingMembership;

  @ApiProperty()
  @IsInt()
  wingGrid: WingGrid;
}
