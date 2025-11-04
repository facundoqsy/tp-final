import { Module } from '@nestjs/common';
import { VeterinariaController } from './veterinaria.controller';
import { VeterinariaService } from './veterinaria.service';

@Module({
  controllers: [VeterinariaController],
  providers: [VeterinariaService],
})
export class VeterinariaModule {}
//Este archivo define el módulo de NestJS. agrupa el controlador y el servicio de la veterinaria. controllers indica qué controladores usa el módulo, y providers indica los servicios que se pueden inyectar.