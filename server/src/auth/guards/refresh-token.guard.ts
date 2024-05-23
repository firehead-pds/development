import { AuthGuard } from '@nestjs/passport';

export default class RefreshTokenGuard extends AuthGuard('refresh-token') {
  constructor() {
    super();
  }
}
