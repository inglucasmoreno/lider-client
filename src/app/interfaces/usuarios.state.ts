import { Usuario } from "../models/usuario.model";

export interface UsuariosState {
    loading: boolean,
    usuarios: ReadonlyArray<Usuario>;
} 