import { Proceso } from "./proceso.models";

export interface Elecciones {
  tipo:number;
  idEleccion: number;
  idCliente: number;
  //razonSocial: string;
  ruc: string;
  nombre: string;
  colorBase: string;
  urlLogo: string; 
  fechaDifusion: string;
  fechaInicio: string;
  fechaFin: string;
  fechaRegistro: string;
  planillaConfirmada: boolean;
  difusionEnviada: boolean;
  estado:number;
  ListProceso: Proceso[];
}
