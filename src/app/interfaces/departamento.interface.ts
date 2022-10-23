export interface Departamento {
    id: number;
    nombre: string;
}

export interface DepartamentoGet {
    ok: boolean;
    departamentos: Departamento[];
}