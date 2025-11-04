import { Module } from '@nestjs/common';
import { VeterinariaModule } from './veterinaria/veterinaria.module';

@Module({
  imports: [VeterinariaModule],
})
export class AppModule {}
