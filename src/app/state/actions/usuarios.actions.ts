import { createAction, props } from '@ngrx/store';
import { Usuarios } from '../../interfaces/usuarios.interface';

// Custom Types
export enum UsuariosActionTypes {
    LIMPIAR_ESTADOS = '[Usuarios] Limpieza de estados',
    ALERTAS_ERROR = '[Usuarios] Error al realizar un accion',
    OBTENER_USUARIO = '[Usuarios] obtener usuarios',
    OBTENER_USUARIO_CORRECTO = '[Usuarios] obtener usuarios correcto',
    LISTAR_USUARIOS = '[Usuarios] listar usuarios',
    LISTAR_USUARIOS_CORRECTO = '[Usuarios] listado de usuarios correcto',
    NUEVO_USUARIO = '[Usuarios] nuevo usuario',
    NUEVO_USUARIO_CORRECTO = '[Usuarios] nuevo usuario creado correctamente',
    ACTUALIZAR_USUARIO = '[Usuarios] actualizar usuario',
    ACTUALIZAR_USUARIO_CORRECTO = '[Usuarios] usuarios actualizado correctamente',
}

// Inicializaciones
export const limpiarEstados = createAction(
    UsuariosActionTypes.LIMPIAR_ESTADOS,
);

// Manejo de errores

export const alertasError = createAction(
    UsuariosActionTypes.ALERTAS_ERROR,
    props<{error: string}>()
);

// Obtener usuario

export const obtenerUsuario = createAction(
    UsuariosActionTypes.OBTENER_USUARIO,
    props<{id: string}>()
);

export const obtenerUsuarioCorrecto = createAction(
    UsuariosActionTypes.OBTENER_USUARIO_CORRECTO,
    props<{usuario: Usuarios}>()
);

// Listar usuarios

export const listarUsuarios = createAction(
    UsuariosActionTypes.LISTAR_USUARIOS,
    props<{direccion: number, columna: string}>()
);

export const listarUsuariosCorrecto = createAction(
    UsuariosActionTypes.LISTAR_USUARIOS_CORRECTO,
    props<{usuarios: Usuarios[]}>()
);


// Nuevo usuario

export const nuevoUsuario = createAction(
    UsuariosActionTypes.NUEVO_USUARIO,
    props<{usuario: Usuarios}>()
);

export const nuevoUsuarioCorrecto = createAction(
    UsuariosActionTypes.NUEVO_USUARIO_CORRECTO,
    props<{usuario: Usuarios}>()
);

// Actualizar usuario

export const actualizarUsuario = createAction(
    UsuariosActionTypes.ACTUALIZAR_USUARIO,
    props<{id: string, data: any}>()
);

export const actualizarUsuarioCorrecto = createAction(
    UsuariosActionTypes.ACTUALIZAR_USUARIO_CORRECTO,
    props<{usuario: Usuarios}>()
);