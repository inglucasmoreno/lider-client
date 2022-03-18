import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of }  from 'rxjs';
import { map, mergeMap, catchError } from 'rxjs/operators'; 
import { UsuariosService } from "src/app/services/usuarios.service";
import { UsuariosActionTypes } from "../actions/usuarios.actions";

@Injectable()
export class UsuariosEffects {

    constructor( private actions: Actions,
                 private usuariosService: UsuariosService){}
    
    // Obtener usuario
    public obtenerUsuario = createEffect(() => {
        return this.actions.pipe(
            ofType(UsuariosActionTypes.OBTENER_USUARIO),
            mergeMap(({ id }) => this.usuariosService.getUsuario(id).pipe(
                map((usuario) => ({ type: UsuariosActionTypes.OBTENER_USUARIO_CORRECTO, usuario })),
                catchError((error) => of({type: UsuariosActionTypes.ALERTAS_ERROR, error: error.message}))
            )))    
    });

    // Listar usuario
    public listarUsuarios = createEffect(() => {
        return this.actions.pipe(
            ofType(UsuariosActionTypes.LISTAR_USUARIOS),
            mergeMap(({ direccion, columna }) => this.usuariosService.listarUsuarios(direccion, columna).pipe(
                map(({usuarios}) => ({ type: UsuariosActionTypes.LISTAR_USUARIOS_CORRECTO, usuarios })),
                catchError((error) => of({type: UsuariosActionTypes.ALERTAS_ERROR, error: error.message}))
            )))    
    });

    // Nuevo usuario
    public nuevoUsuario = createEffect(() => {
        return this.actions.pipe(
            ofType(UsuariosActionTypes.NUEVO_USUARIO),
            mergeMap((usuario) => this.usuariosService.nuevoUsuario(usuario).pipe(
                map(({ usuario }) => {
                    return { type: UsuariosActionTypes.NUEVO_USUARIO_CORRECTO, usuario }
                }),
                catchError(({error}) => of({type: UsuariosActionTypes.ALERTAS_ERROR, error: error.message}))
            )))    
    });

    // Actualizar usuario
    public actualizarUsuario = createEffect(() => {
        return this.actions.pipe(
            ofType(UsuariosActionTypes.ACTUALIZAR_USUARIO),
            mergeMap(({ id, data }) => this.usuariosService.actualizarUsuario(id, data).pipe(
                map(({usuario}) => {
                    return { type: UsuariosActionTypes.ACTUALIZAR_USUARIO_CORRECTO, usuario } 
                }),
                catchError(({error}) => of({type: UsuariosActionTypes.ALERTAS_ERROR, error: error.message}))
            )))    
    });

}

