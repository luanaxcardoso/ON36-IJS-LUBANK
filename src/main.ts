import 'reflect-metadata';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { AppDataSource } from './database/data-source'; 

async function bootstrap() {
  
  try {
    await AppDataSource.initialize();
    console.log('Data Source inicializada!');
  } catch (err) {
    console.error('Erro durante a initialização:', err);
    process.exit(1); 
  }

  const app = await NestFactory.create(AppModule);
  
  app.useGlobalPipes(new ValidationPipe());
  
  await app.listen(3000);
  console.log('Aplicação rodando em: http://localhost:3000');
}

bootstrap();
