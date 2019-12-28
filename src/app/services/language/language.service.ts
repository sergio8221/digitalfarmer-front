import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LanguageService {

  constructor() { }

  // List of messages
  msgs = {
    createSuccess: { type: 'S', msg: 'Creado correctamente' },
    createError: { type: 'E', msg: 'Error al crear' },
    updateSuccess: { type: 'S', msg: 'Actualizado correctamente' },
    updateError: { type: 'E', msg: 'Error al actualizar' },
    deleteSuccess: { type: 'S', msg: 'Borrado correctamente' },
    deleteError: { type: 'E', msg: 'Error al borrar' },
  };
}

export interface Msg {
  type: string,
  msg: string
}
