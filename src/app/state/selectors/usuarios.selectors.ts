import { createSelector } from '@ngrx/store';
import { UsuariosState } from 'src/app/interfaces/usuarios.state';
import { AppState } from '../app.state';

export const selectUsuariosFeature = (state: AppState) => state.usuarios;

// Listado de usuarios
export const selectUsuario = createSelector(
    selectUsuariosFeature,
    (state: UsuariosState) => state.usuario
)

// Listado de usuarios
export const selectUsuarios = createSelector(
    selectUsuariosFeature,
    (state: UsuariosState) => state.usuarios
)

// Redirect
export const selectRedirect = createSelector(
    selectUsuariosFeature,
    (state: UsuariosState) => state.redirect
)

// Variable de loading
export const selectLoading = createSelector(
    selectUsuariosFeature,
    (state: UsuariosState) => state.loading
)

// Error
export const selectError = createSelector(
    selectUsuariosFeature,
    (state: UsuariosState) => state.error
)