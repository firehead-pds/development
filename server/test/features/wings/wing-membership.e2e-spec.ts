import { createUserAndLogin } from '../../utils/auth';

describe('WingMembershipController (e2e)', () => {
  it('/wing-membership/generate-invite (POST)', async () => {
    const app = global.app;

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
