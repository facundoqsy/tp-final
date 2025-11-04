import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
//Este archivo es el controlador principal. Define una ruta GET en / que llama al servicio y devuelve un mensaje. Solo usa una función llamada getHello().