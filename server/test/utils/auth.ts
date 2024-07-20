import { NestFastifyApplication } from '@nestjs/platform-fastify';
import { Cookie } from 'nodemailer/lib/fetch/cookies';

export async function createUserAndLogin(app: NestFastifyApplication) {
  const signUpResponse = await app.inject({
    url: '/auth/local/signup',
    method: 'POST',
    payload: {
      firstName: 'John',
      lastName: 'Doe',
      birthdate: '1990-01-01',
      email: 'john.doe@example.com',
      password: 'password123',
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

  const loginResponse = await app.inject({
    url: 'auth/local/login',
    method: 'POST',
    payload: {
      email: 'john.doe@example.com',
      password: 'password123',
    },
  });

  const { cookies } = loginResponse;
  return cookies.map((cookie) => `${cookie.name}=${cookie.value}`).join('; ');
}
