
import "reflect-metadata";
import { NestFactory } from '@nestjs/core';
import { AppModule } from '../modules/AppModule';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  // Enable CORS for frontend
  app.enableCors({
    origin: true,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: true,
  });
  
  // Prefix all routes with /api
  app.setGlobalPrefix('api');
  
  await app.listen(3000);
}

bootstrap();
