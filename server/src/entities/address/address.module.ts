import { Module } from "@nestjs/common";
import { Address } from "./address.entity";
import { AddressController } from "./address.controller";
import { AddressService } from "./address.service";
import { AddressValidator } from "./validators/address.validator";
import { TypeOrmModule } from "@nestjs/typeorm";

@Module({
  exports: [AddressService, TypeOrmModule],
  imports: [TypeOrmModule.forFeature([Address])],
  controllers: [AddressController],
  providers: [AddressService, AddressValidator]
})
export class AddressModule {
}
