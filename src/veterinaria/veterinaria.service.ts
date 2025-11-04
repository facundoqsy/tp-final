import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { readJSON, writeJSON } from '../common/file-db';

type Duenio = { id:number; nombre:string; telefono:string };
type Mascota = { id:number; nombre:string; especie:string; duenioId:number };
type Turno = { id:number; mascotaId:number; fecha:string; motivo?:string };

const P = {
  duenios: 'data/duenios.json',
  mascotas: 'data/mascotas.json',
  turnos: 'data/turnos.json',
};

@Injectable()
export class VeterinariaService {
  private nextId(list: {id:number}[]) { return list.length ? Math.max(...list.map(x=>x.id))+1 : 1; }

  // Dueños
  listDuenios(){ return readJSON<Duenio[]>(P.duenios, []); }
  getDuenio(id:number){
    const d = this.listDuenios().find(x=>x.id===id);
    if(!d) throw new NotFoundException('Dueño no encontrado');
    return d;
  }
  createDuenio(data: Omit<Duenio,'id'>){
    if(!data?.nombre) throw new BadRequestException('nombre requerido');
    const list = this.listDuenios();
    const nuevo = { id:this.nextId(list), ...data };
    writeJSON(P.duenios, [...list, nuevo]);
    return nuevo;
  }
  putDuenio(id:number, data: Omit<Duenio,'id'>){
    const list = this.listDuenios();
    const i = list.findIndex(x=>x.id===id);
    if(i<0) throw new NotFoundException('Dueño no encontrado');
    list[i] = { id, ...data };
    writeJSON(P.duenios, list);
    return list[i];
  }
  patchDuenio(id:number, data: Partial<Omit<Duenio,'id'>>){
    const list = this.listDuenios();
    const i = list.findIndex(x=>x.id===id);
    if(i<0) throw new NotFoundException('Dueño no encontrado');
    list[i] = { ...list[i], ...data };
    writeJSON(P.duenios, list);
    return list[i];
  }

  // Mascotas
  listMascotas(){ return readJSON<Mascota[]>(P.mascotas, []); }
  getMascota(id:number){
    const m = this.listMascotas().find(x=>x.id===id);
    if(!m) throw new NotFoundException('Mascota no encontrada');
    return m;
  }
  createMascota(data: Omit<Mascota,'id'>){
    if(!data?.duenioId) throw new BadRequestException('duenioId requerido');
    this.getDuenio(data.duenioId);
    const list = this.listMascotas();
    const nuevo = { id:this.nextId(list), ...data };
    writeJSON(P.mascotas, [...list, nuevo]);
    return nuevo;
  }
  putMascota(id:number, data: Omit<Mascota,'id'>){
    const list = this.listMascotas();
    const i = list.findIndex(x=>x.id===id);
    if(i<0) throw new NotFoundException('Mascota no encontrada');
    list[i] = { id, ...data };
    writeJSON(P.mascotas, list);
    return list[i];
  }
  patchMascota(id:number, data: Partial<Omit<Mascota,'id'>>){
    const list = this.listMascotas();
    const i = list.findIndex(x=>x.id===id);
    if(i<0) throw new NotFoundException('Mascota no encontrada');
    list[i] = { ...list[i], ...data };
    writeJSON(P.mascotas, list);
    return list[i];
  }

  // Turnos
  listTurnos(){ return readJSON<Turno[]>(P.turnos, []); }
  createTurno(data: Omit<Turno,'id'>){
    this.getMascota(data.mascotaId);
    const fecha = new Date(data.fecha);
    if(isNaN(+fecha) || fecha < new Date()) throw new BadRequestException('fecha inválida o pasada');
    const list = this.listTurnos();
    const nuevo = { id:this.nextId(list), ...data };
    writeJSON(P.turnos, [...list, nuevo]);
    return nuevo;
  }
}
