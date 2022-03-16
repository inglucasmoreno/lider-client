import { createReducer, on } from '@ngrx/store';
import { UsuariosState } from 'src/app/interfaces/usuarios.state';
import { 
    usuariosListados, 
    listarUsuarios, 
    actualizarUsuario, 
    usuarioActualizado} from '../actions/usuarios.actions';

export const initialState: UsuariosState = { 
    loading: false, 
    usuarios: []
}

export const usuariosReducer = createReducer(

    initialState,
    
    // Comienzo - Listado de usuarios
    on(listarUsuarios, (state) => ({ ...state, loading: true })),
    
    // Finalizacion - Listado de usuario
    on(usuariosListados, (state, { usuarios }) => ({ ...state, loading: false, usuarios })),
    
    // Comienzo - Actualizacion de usuario
    on(actualizarUsuario, (state) => ({ ...state, loading: true })),
    
    // Finalizacion - Actualizacion de usuario
    on(usuarioActualizado, (state, { usuario }) => {
        const usuarios = state.usuarios.map(elemento => {
            if(elemento._id === usuario._id) return usuario;
            return elemento;
        });
        return { ...state, loading: false, usuarios }
    }),

); 