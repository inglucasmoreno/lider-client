import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { EMPTY }  from 'rxjs';
import { map, mergeMap, catchError } from 'rxjs/operators'; 
import { UsuariosService } from "src/app/services/usuarios.service";
import { UsuariosActionTypes } from "../actions/usuarios.actions";

@Injectable()
export class UsuariosEffects {

    constructor( private actions: Actions,
                 private usuariosService: UsuariosService){}
    
    // Listar usuario
    public listarUsuarios = createEffect(() => {
        return this.actions.pipe(
            ofType(UsuariosActionTypes.LISTAR_USUARIOS),
            mergeMap(({ direccion, columna }) => this.usuariosService.listarUsuarios(direccion, columna).pipe(
                map(({usuarios}) => {
                    return { type: UsuariosActionTypes.LISTAR_USUARIOS_TERMINADO, usuarios } 
                }),
                catchError(() => EMPTY)
            )))    
    });

    // Actualizar usuario
    public actualizarUsuario = createEffect(() => {
        return this.actions.pipe(
            ofType(UsuariosActionTypes.ACTUALIZAR_USUARIO),
            mergeMap(({ id, data }) => this.usuariosService.actualizarUsuario(id, data).pipe(
                map(({usuario}) => {
                    return { type: UsuariosActionTypes.ACTUALIZAR_USUARIO_TERMINADO, usuario } 
                }),
                catchError(() => EMPTY)
            )))    
    });

}

