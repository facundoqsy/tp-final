import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }
}
//Este archivo es un servicio simple, tiene una función getHello() que da el texto "Hello World!" y El controlador lo usa para responder.