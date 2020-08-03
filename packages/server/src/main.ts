import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    allowedHeaders: '*',
    exposedHeaders: '*',
    origin: '*',
  });
  app.setGlobalPrefix('api');
  console.log(process.env.APP_PORT);
  await app.listen(process.env.APP_PORT || 5000);
}
bootstrap();
