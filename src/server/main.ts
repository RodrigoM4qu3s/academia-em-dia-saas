
import { NestFactory } from '@nestjs/core';
import { AppModule } from '../modules/AppModule';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  // Configurar CORS para permitir requisições do frontend
  app.enableCors({
    origin: process.env.FRONTEND_URL || 'http://localhost:8080',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true,
  });
  
  await app.listen(3000);
  console.log('Servidor backend rodando na porta 3000');
}

bootstrap();

