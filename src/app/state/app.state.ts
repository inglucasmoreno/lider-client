import { ActionReducerMap } from "@ngrx/store";
import { UsuariosState } from "../interfaces/usuarios.state";
import { usuariosReducer } from "./reducers/usuarios.reducers";

export interface AppState {
    usuarios: UsuariosState;
}

export const ROOT_REDUCERS: ActionReducerMap<AppState> = {
    usuarios: usuariosReducer
}