import { app } from './global-setup';

describe('AppController (e2e)', () => {
  it('/ (GET)', async () => {
    const res = await app.inject({
      method: 'GET',
      url: '/',
    });

    expect(res.statusCode).toEqual(200);
  });
});
