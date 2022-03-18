import { createReducer, on } from '@ngrx/store';
import { UsuariosState } from 'src/app/interfaces/usuarios.state';
import { 
    listarUsuarios, 
    actualizarUsuario, 
    nuevoUsuario,
    listarUsuariosCorrecto,
    nuevoUsuarioCorrecto,
    actualizarUsuarioCorrecto,
    limpiarEstados,
    alertasError,
    obtenerUsuario,
    obtenerUsuarioCorrecto} from '../actions/usuarios.actions';

export const initialState: UsuariosState = { 
    loading: false,
    usuario: null, 
    usuarios: [],
    redirect: false,
    error: ''
}

export const usuariosReducer = createReducer(

    initialState,

    on(limpiarEstados, (state) => ({ ...state, error: '', redirect: false, usuario: null })),
    
    on(alertasError, (state, { error }) => ({ ...state, loading: false, error })),
    
    on(obtenerUsuario, (state) => ({ ...state, loading: true })),

    on(obtenerUsuarioCorrecto, (state, { usuario }) => ({ ...state, loading: false, usuario })),
    
    on(listarUsuarios, (state) => ({ ...state, loading: true })),
    
    on(listarUsuariosCorrecto, (state, { usuarios }) => ({ ...state, loading: false, usuarios })),
    
    on(nuevoUsuario, (state) => ({ ...state, loading: true })),
    
    on(nuevoUsuarioCorrecto, (state) => ({ ...state, loading: false, redirect: true  })),
    
    on(actualizarUsuario, (state) => ({ ...state, loading: true })),
    
    on(actualizarUsuarioCorrecto, (state, { usuario }) => {
        const usuarios = state.usuarios.map(elemento => {
            if(elemento._id === usuario._id) return usuario;
            return elemento;
        });
        return { ...state, loading: false, usuarios, redirect: true }
    }),

); 