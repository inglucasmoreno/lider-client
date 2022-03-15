import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { EMPTY }  from 'rxjs';
import { map, mergeMap, catchError } from 'rxjs/operators'; 
import { UsuariosService } from "src/app/services/usuarios.service";

@Injectable()
export class UsuariosEffects {

    constructor( private actions: Actions,
                 private usuariosService: UsuariosService){}
    
    // Listar usuario
    public listarUsuarios = createEffect(() => {
        return this.actions.pipe(
            ofType('[Usuarios] listar usuarios'),
            mergeMap(({ direccion, columna }) => this.usuariosService.listarUsuarios(direccion, columna).pipe(
                map(({usuarios}) => {
                    return { type: '[Usuarios] listado correcto', usuarios } 
                }),
                catchError(() => EMPTY)
            )))    
    });

    // Actualizar usuario
    public actualizarUsuario = createEffect(() => {
        return this.actions.pipe(
            ofType('[Usuarios] actualizar usuario'),
            mergeMap(({ id, data }) => this.usuariosService.actualizarUsuario(id, data).pipe(
                map(({usuario}) => {
                    return { type: '[Usuarios] usuario actualizado', usuario } 
                }),
                catchError(() => EMPTY)
            )))    
    });

}

