import { createAction, props } from '@ngrx/store';
import { Usuarios } from '../../interfaces/usuarios.interface';

// Custom Types
export enum UsuariosActionTypes {
    LISTAR_USUARIOS = '[Usuarios] listar usuarios',
    LISTAR_USUARIOS_TERMINADO = '[Usuarios] listar usuarios terminado',
    NUEVO_USUARIO = '[Usuarios] nuevo usuario',
    NUEVO_USUARIO_TERMINADO = '[Usuarios] nuevo usuario terminado',
    ACTUALIZAR_USUARIO = '[Usuarios] actualizar usuario',
    ACTUALIZAR_USUARIO_TERMINADO = '[Usuarios] actualizar usuario terminado',
}

// Listar usuarios

export const listarUsuarios = createAction(
    UsuariosActionTypes.LISTAR_USUARIOS,
    props<{direccion: number, columna: string}>()
);

export const usuariosListados = createAction(
    UsuariosActionTypes.LISTAR_USUARIOS_TERMINADO,
    props<{usuarios: Usuarios[]}>()
);

// Nuevo usuario

export const nuevoUsuario = createAction(
    UsuariosActionTypes.NUEVO_USUARIO,
    props<{usuario: Usuarios}>()
);

export const usuarioCreado = createAction(
    UsuariosActionTypes.NUEVO_USUARIO_TERMINADO,
    props<{usuario: Usuarios}>()
);

// Actualizar usuario

export const actualizarUsuario = createAction(
    UsuariosActionTypes.ACTUALIZAR_USUARIO,
    props<{id: string, data: any}>()
);

export const usuarioActualizado = createAction(
    UsuariosActionTypes.ACTUALIZAR_USUARIO_TERMINADO,
    props<{usuario: Usuarios}>()
);