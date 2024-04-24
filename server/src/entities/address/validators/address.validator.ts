import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Address } from "../address.entity";
import { Repository } from "typeorm";

@Injectable()
export class AddressValidator {
  constructor(
    @InjectRepository(Address) private repository: Repository<Address>
  ) {
  }
}
