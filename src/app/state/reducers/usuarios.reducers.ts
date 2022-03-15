import { createReducer, on } from '@ngrx/store';
import { Usuarios } from 'src/app/interfaces/usuarios.interface';
import { UsuariosState } from 'src/app/interfaces/usuarios.state';
import { loadedUsuarios, loadUsuarios } from '../actions/usuarios.actions';

export const initialState: UsuariosState = { loading: false, usuarios: [] }

export const usuariosReducer = createReducer(
    initialState,
    // Se solicitan los nuevo usuarios
    on(loadUsuarios, (state) => {
        return {...state, loading: true};
    }),
    // Se obtienen los nuevos usuarios
    on(loadedUsuarios, (state, { usuarios }) => {
        return {...state, loading: false, usuarios}
    })
); 