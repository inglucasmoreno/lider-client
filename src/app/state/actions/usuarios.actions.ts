import { createAction, props } from '@ngrx/store';
import { Usuarios } from '../../interfaces/usuarios.interface';

// Listar usuarios

export const listarUsuarios = createAction(
    '[Usuarios] listar usuarios',
    props<{direccion: number, columna: string}>()
);

export const usuariosListados = createAction(
    '[Usuarios] listado correcto',
    props<{usuarios: Usuarios[]}>()
);

// Actualizar usuario

export const actualizarUsuario = createAction(
    '[Usuarios] actualizar usuario',
    props<{id: string, data: any}>()
);

export const usuarioActualizado = createAction(
    '[Usuarios] usuario actualizado',
    props<{usuario: Usuarios}>()
);