import { createAction, props } from '@ngrx/store';
import { Usuarios } from '../../interfaces/usuarios.interface';

export const loadUsuarios = createAction(
    '[Usuarios List] Load usuarios',
    props<{direccion: number, columna: string}>()
);

export const loadedUsuarios = createAction(
    '[Usuarios List] Loaded success',
    props<{usuarios: Usuarios[]}>()
);