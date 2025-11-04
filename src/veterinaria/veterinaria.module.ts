import { Module } from '@nestjs/common';
import { VeterinariaController } from './veterinaria.controller';
import { VeterinariaService } from './veterinaria.service';

@Module({
  controllers: [VeterinariaController],
  providers: [VeterinariaService],
})
export class VeterinariaModule {}
