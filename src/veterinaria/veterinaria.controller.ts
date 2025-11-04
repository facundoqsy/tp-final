import { Controller, Get, Post, Put, Patch, Param, Body, ParseIntPipe } from '@nestjs/common';
import { VeterinariaService } from './veterinaria.service';

@Controller()
export class VeterinariaController {
  constructor(private srv: VeterinariaService) {}

  // Dueños
  @Get('duenios') listD() { return this.srv.listDuenios(); }
  @Get('duenios/:id') getD(@Param('id', ParseIntPipe) id:number){ return this.srv.getDuenio(id); }
  @Post('duenios') createD(@Body() b:any){ return this.srv.createDuenio(b); }
  @Put('duenios/:id') putD(@Param('id', ParseIntPipe) id:number,@Body() b:any){ return this.srv.putDuenio(id,b); }
  @Patch('duenios/:id') patchD(@Param('id', ParseIntPipe) id:number,@Body() b:any){ return this.srv.patchDuenio(id,b); }

  // Mascotas
  @Get('mascotas') listM(){ return this.srv.listMascotas(); }
  @Get('mascotas/:id') getM(@Param('id', ParseIntPipe) id:number){ return this.srv.getMascota(id); }
  @Post('mascotas') createM(@Body() b:any){ return this.srv.createMascota(b); }
  @Put('mascotas/:id') putM(@Param('id', ParseIntPipe) id:number,@Body() b:any){ return this.srv.putMascota(id,b); }
  @Patch('mascotas/:id') patchM(@Param('id', ParseIntPipe) id:number,@Body() b:any){ return this.srv.patchMascota(id,b); }

  // Turnos
  @Get('turnos') listT(){ return this.srv.listTurnos(); }
  @Post('turnos') createT(@Body() b:any){ return this.srv.createTurno(b); }
}
//Este archivo es el controlador de la API en NestJS. Define las rutas (endpoints) que se pueden usar para manejar dueños, mascotas y turnos. Cada método llama a una función del servicio (VeterinariaService) que hace la lógica real.