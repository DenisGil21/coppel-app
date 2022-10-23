export interface Familia {
    id: number;
    nombre: string;
    clase_id: number;
}

export interface FamiliaGet {
    ok: boolean;
    familias: Familia[];
}