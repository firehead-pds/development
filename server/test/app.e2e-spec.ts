import { NestFastifyApplication } from '@nestjs/platform-fastify';
import { createUserAndLogin } from './utils/auth';

describe('AppController (e2e)', () => {
  let app: NestFastifyApplication;

  beforeAll(async () => {
    app = global.app;
  }, 10000);

  it('/ (GET)', async () => {
    console.log(await createUserAndLogin(app));

    const res = await app.inject({
      method: 'GET',
      url: '/',
    });

    expect(res.statusCode).toEqual(200);
  });
});
