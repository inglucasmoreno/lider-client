import { Usuario } from "../models/usuario.model";

export interface UsuariosState {
    loading: Readonly<boolean>;
    usuario: Readonly<Usuario>;
    usuarios: ReadonlyArray<Usuario>;
    redirect: Readonly<boolean>;
    error: Readonly<string>;
} 