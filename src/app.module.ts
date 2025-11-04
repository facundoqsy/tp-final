import { Module } from '@nestjs/common';
import { VeterinariaModule } from './veterinaria/veterinaria.module';

@Module({
  imports: [VeterinariaModule],
})
export class AppModule {}
//Este archivo es el módulo principal de la app, importa el módulo de la veterinaria para que NestJS lo use.