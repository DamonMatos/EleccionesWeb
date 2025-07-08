export interface Proceso {
  tipo:number;
  idEleccion: number;
  idProceso: number;
  nombre: string;
  numeroCandidatos: number;
  votacionObligatoria: boolean;
}