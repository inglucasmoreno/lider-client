// Modelo - Empresas
export class Empresas {
    constructor(
        public _id: string,
        public nombre: string,
        public cuit: string,
        public direccion: string,
        public telefono: string,
        public activo?: boolean,
        public password?: string,
        public createdAt?: string        
    ){}    
}