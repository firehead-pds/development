import { Injectable } from "@nestjs/common";
import { compare, hash } from "bcrypt";

@Injectable()
export class HashingService {
  public async hashData(value: string) {
    const saltOrRounds = 12;
    return await hash(value, saltOrRounds);
  }

  public async compareData(value: string, hashedValue: string) {
    return await compare(value, hashedValue);
  }
}
