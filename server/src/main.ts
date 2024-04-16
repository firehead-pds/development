import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { fastifyAdapter } from './config/fastify.config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, fastifyAdapter);
  await app.listen(3000);
}

bootstrap();
