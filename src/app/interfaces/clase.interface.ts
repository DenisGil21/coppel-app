export interface Clase {
    id: number;
    nombre: string;
    departamento_id: number;
}

export interface ClaseGet {
    ok: boolean;
    clases: Clase[];
}
