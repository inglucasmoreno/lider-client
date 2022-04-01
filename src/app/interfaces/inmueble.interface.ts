export interface Inmueble {
    _id: string,
    descripcion_corta: string,
    descripcion_completa: string,
    codigo: string,
    ubicacion: string,
    tipo: string,
    venta: boolean,
    precio: {
        valor: number,
        dolar: boolean
    },
    fotos?: string,
    activo?: boolean,
    createdAt?: string        
}