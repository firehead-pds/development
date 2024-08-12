import { createUserAndLogin } from '../../utils/auth';

describe('WingGridController (e2e)', () => {
  it('/wing-grids/create (POST)', async () => {
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

    const createWingGridResponse = await app.inject({
      url: '/wing-grids/create',
      method: 'POST',
      payload: {
        rows: 3,
        cols: 3,
        wingGridName: 'Test Grid',
        wingId,
      },
      headers: {
        cookie: cookies,
      },
    });

    expect(createWingGridResponse.statusCode).toEqual(201);
    expect(createWingGridResponse.json().id).toBeDefined();
  });
});
