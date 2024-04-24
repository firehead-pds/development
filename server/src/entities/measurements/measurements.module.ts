import { Module } from "@nestjs/common";
import { Measurements } from "./measurements.entity";
import { MeasurementsController } from "./measurements.controller";
import { MeasurementsService } from "./measurements.service";
import { MeasurementsValidator } from "./validators/measurements.validator";
import { TypeOrmModule } from "@nestjs/typeorm";

@Module({
  exports: [MeasurementsService, TypeOrmModule],
  imports: [TypeOrmModule.forFeature([Measurements])],
  controllers: [MeasurementsController],
  providers: [MeasurementsService, MeasurementsValidator]
})
export class MeasurementsModule {
}
