import { createUserAndLogin } from '../../utils/auth';
import { app } from '../../global-setup';

describe('WingGridController (e2e)', () => {
  it('/wing-grids/create (POST) - Create wing grid and associate it with a wing already created', async () => {
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
        wingId: wingId,
        wingGridName: 'Test Grid',
        rows: 3,
        cols: 3,
      },
      headers: {
        cookie: cookies,
      },
    });

    const wingGridId = createWingGridResponse.json().id;
    const wingGridCreated = await app.inject({
      url: `/wing-grids/${wingGridId}`,
      method: 'GET',
      headers: {
        cookie: cookies,
      },
    });

    expect(createWingGridResponse.statusCode).toEqual(201);
    expect(wingGridCreated.json().wing.id).toEqual(wingId);
  });
});
