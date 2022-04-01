export class Inmueble {
    constructor(
        public _id: string,
        public descripcion_corta: string,
        public descripcion_completa: string,
        public codigo: string,
        public ubicacion: string,
        public tipo: string,
        public venta: boolean,
        public precio: {
            valor: number,
            dolar: boolean
        },
        public fotos?: string,
        public activo?: boolean,
        public createdAt?: string        
    ){}    
}