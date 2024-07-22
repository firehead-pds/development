import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from '../src/app.module';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';

let app: NestFastifyApplication;

export default async () => {
  const moduleFixture: TestingModule = await Test.createTestingModule({
    imports: [AppModule],
  }).compile();

  app = moduleFixture.createNestApplication<NestFastifyApplication>(
    new FastifyAdapter(),
  );

  await app.init();
  await app.getHttpAdapter().getInstance().ready();

  global.app = app;
};

export async function teardown() {
  await global.app.close();
}
