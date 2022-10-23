export interface Articulo {
    id: number;
    sku: number;
    articulo: string;
    marca: string;
    modelo: string;
    fecha_alta: string;
    stock: number;
    cantidad: number;
    descontinuado: number;
    fecha_baja: string;
    familia_id: number;
    nombre: string;
    clase_id: number;
    departamento_id: number;
}

export interface ArticuloGet {
    ok: boolean;
    articulo: Articulo[];
}
