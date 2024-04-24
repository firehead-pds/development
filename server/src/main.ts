import { ValidationPipe } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { TransformInterceptor } from "./interceptors/transform.interceptors";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import * as process from "node:process";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: process.env.FRONTEND_ORIGIN,
    allowedHeaders: ["Content-Type", "Access-Control-Allow-Headers", "Authorization"]
  });

  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalInterceptors(new TransformInterceptor());

  const config = new DocumentBuilder()
    .setTitle("FIREHEAD")
    .setDescription("+Samba REST API")
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup("api", app, document);

  await app.listen(3000);
}

bootstrap();
