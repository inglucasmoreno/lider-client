import { createSelector } from '@ngrx/store';
import { UsuariosState } from 'src/app/interfaces/usuarios.state';
import { AppState } from '../app.state';

export const selectUsuariosFeature = (state: AppState) => state.usuarios;

export const selectListUsuarios = createSelector(
    selectUsuariosFeature,
    (state: UsuariosState) => state.usuarios
)

export const selectLoading = createSelector(
    selectUsuariosFeature,
    (state: UsuariosState) => state.loading
)