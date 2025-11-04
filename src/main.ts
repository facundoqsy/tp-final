import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(3000);
  console.log('API lista en http://localhost:3000');
}
bootstrap();
//Este archivo inicia la aplicación NestJS, Crea la app usando el módulo principal y la pone a escuchar en el puerto 3000,  También muestra un mensaje en consola cuando arranca.