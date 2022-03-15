import { createReducer, on } from '@ngrx/store';
import { UsuariosState } from 'src/app/interfaces/usuarios.state';
import { 
    usuariosListados, 
    listarUsuarios, 
    actualizarUsuario, 
    usuarioActualizado} from '../actions/usuarios.actions';

export const initialState: UsuariosState = { 
    loading: false, 
    usuarios: [], 
    usuario: null 
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
        state.usuarios.forEach(elemento => {
            console.log(usuario);
            if(elemento._id === usuario._id) elemento = usuario;
            return (elemento._id === usuario._id);
        });
        console.log(state.usuarios);
        return { ...state, loading: false }
    }),

); 