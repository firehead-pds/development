import { Controller } from '@nestjs/common';

@Controller('/users')
export class ParticipatesController {
  constructor() {}
}

/*@OneToMany(() => Participate, (participate) => participate)
participate?: Participate;*/
