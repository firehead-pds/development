import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from '../../../src/app.module';
import { createUserAndLogin } from '../../utils/auth';

describe('WingMembershipController (e2e)', () => {
  let app: NestFastifyApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication<NestFastifyApplication>(
      new FastifyAdapter(),
    );

    await app.init();
    await app.getHttpAdapter().getInstance().ready();
  }, 20000);

  it('/wing-membership/generate-invite (POST)', async () => {
    const cookies = await createUserAndLogin(app);

    const createWingResponse = await app.inject({
      url: '/wing/create',
      method: 'POST',
      payload: {
        wingName: 'Test Wing',
      },
      headers: {
        cookie: cookies,
      },
    });
    expect(createWingResponse.statusCode).toEqual(201);

    const wingId = createWingResponse.json().id;

    const generateInviteCodeResponde = await app.inject({
      url: '/wing-membership/generate-invite',
      method: 'POST',
      payload: {
        wingId,
      },
      headers: {
        cookie: cookies,
      },
    });

    expect(generateInviteCodeResponde.statusCode).toEqual(201);
    expect(generateInviteCodeResponde.json().token).toBeDefined();
  });
});
