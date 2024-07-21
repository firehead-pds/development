import { NestFastifyApplication } from '@nestjs/platform-fastify';

describe('AuthController (e2e)', () => {
  const app = global.app as NestFastifyApplication;

  it('/auth/local/login (POST)', async () => {
    const firstName = 'John';
    const lastName = 'Doe';
    const email = 'john.doe@example.com';
    const password = 'password123';

    await app.inject({
      url: '/auth/local/signup',
      method: 'POST',
      payload: {
        firstName,
        lastName,
        birthdate: '1990-01-01',
        email,
        password,
        phoneNumber: '11920409045',
        cpf: '39214946051',
        measurements: {
          shoeSize: '9',
          shirtSize: 'M',
          pantsSize: '32',
          height: '6ft',
        },
        address: {
          addressLine: 'R. Pedro Vicente',
          addressNumber: '625',
          district: 'Canindé',
          city: 'São Paulo',
          state: 'São Paulo',
          postalCode: '01109-010 ',
        },
      },
    });

    const res = await app.inject({
      method: 'POST',
      url: '/auth/local/login',
      payload: {
        email,
        password,
      },
    });

    expect(res.statusCode).toEqual(201);
    expect(res.payload).toEqual(
      JSON.stringify({
        firstName,
        lastName,
        email,
        wingsInfo: [],
      }),
    );
  });
});
