describe('AppController (e2e)', () => {
  const app = global.app;

  it('/ (GET)', async () => {
    const res = await app.inject({
      method: 'GET',
      url: '/',
    });

    expect(res.statusCode).toEqual(200);
  });
});
