import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { EMPTY }  from 'rxjs';
import { map, mergeMap, catchError } from 'rxjs/operators'; 
import { UsuariosService } from "src/app/services/usuarios.service";

@Injectable()
export class UsuariosEffects {

    constructor( private actions: Actions,
                 private usuariosService: UsuariosService){}
    
    public loadUsuarios = createEffect(() => {
        return this.actions.pipe(
            ofType('[Usuarios List] Load usuarios'),
            mergeMap(({ direccion, columna }) => this.usuariosService.listarUsuarios(direccion, columna).pipe(
                map(({usuarios}) => {
                    return { type: '[Usuarios List] Loaded success', usuarios } 
                }),
                catchError(() => EMPTY)
            )))    
    });

}

