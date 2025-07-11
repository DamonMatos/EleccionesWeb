import { Component } from '@angular/core';
import { Colaborador } from '../../models/colaboradores.models';
import Utils from 'src/app/utils/funciones.utils';
import * as XLSX from 'xlsx';
import { EleccionService } from 'src/app/service/eleccion.service';
import { ColaboradoresService } from 'src/app/service/colaboradores.service';

@Component({
  selector: 'app-colaborador',
  templateUrl: './colaborador.component.html',
  styleUrls: ['./colaborador.component.css']

})
export class ColaboradorComponent {
  public extensionExportar:string = "";
  public enviando = false;
 // public mensaje = '';
  public _Listcolaboradores: Colaborador[] = [];
  public listaExcel: any[] = [];

  public _Tipo : number= 1;
  public _Id: number= 0;
  public eleccionSeleccionado: number | 0 = 0;
  public procesoSeleccionada:  number | 0 = 0;

  public _ListaEle :any[]= [];
  public _ListaPro :any[]= [];

  public deshabilitado: boolean = true;

  Desabilitar() {
    this.deshabilitado = false;
  }
  Habilitar(){
    this.deshabilitado = true;
  }

  constructor(private _Eleccionservice : EleccionService,private _Colaboradoresservice: ColaboradoresService) { }

  ngOnInit(): void {
    this._Listar();
  }

  _Listar(){
    this.Habilitar();
    this._Tipo = 1;
    const _IdCliente = localStorage.getItem('IdCliente');
    if (_IdCliente) {
      this._Id = JSON.parse(_IdCliente);
      this._Listar_Desplegable<any>(this._Tipo, this._Id, (data) => {
        this._ListaEle = data;
      });
    }
  }

  _Listar_Desplegable<T>(Tipo: number, Id: number, callback: (data: T[]) => void): void {
      this._Eleccionservice.getLista(Tipo, Id).subscribe((response: any) => {
      if (response.status === 1) {
        callback(response.data as T[]);
      }
    });
  }

  _OnEleccionChange() {
    if (this.eleccionSeleccionado){
          this._Tipo = 2;
          this._Listar_Desplegable<any>(this._Tipo, this.eleccionSeleccionado, (data) => {
            this._ListaPro = data;
          });
    }
    else{
      this._ListaPro = [];
    }
  }

  _Get() {
    this.Desabilitar();
    const _idEleccion = this.eleccionSeleccionado;
    const _idproceso = this.procesoSeleccionada;

    if (_idEleccion === 0 || _idproceso === 0) {
      this._Listcolaboradores = [];
      console.warn('Elección o proceso no seleccionados');
      return;
    }

    this._Listcolaboradores = [];
    this._Colaboradoresservice.get(_idEleccion, _idproceso).subscribe((response: any) => {     
      this._Nuevo();

      if (response.status === 1) {        
        this._Listcolaboradores = response.data;
        }
    });
  }

  _Nuevo(){
    this._Listcolaboradores = [{ 
      tipo:1, 
      idEleccion:this.eleccionSeleccionado, 
      idProceso:this.procesoSeleccionada, 
      tipoDocumento: 'DNI' , 
      numeroDocumento:'', 
      nombre:'',
      apellidoPaterno:'', 
      apellidoMaterno:'', 
      cargo:'',
      sede:'', 
      emaildifusion:'',
      estado :1
    }];
  }

  _Guardar() {
    const _IdEle = this.eleccionSeleccionado;
    const _IdPro = this.procesoSeleccionada;

    this._Colaboradoresservice.add(this._Listcolaboradores).subscribe((response: any) => {
      if (response.status === 1) { 
         Utils.mensajeInformativo("Aviso", "Se registro los colaboradores de manera correcta.");
      } 
      else {
        Utils.mensajeError("Error al registrar los colaboradores.");
      }
    }, 
    error => {
      Utils.mensajeError("Error en la peticion.");
      console.error('Error en la petición:', error);
    });
  }

  _OnFileChange(event: any): void {
    const target: DataTransfer = <DataTransfer>(event.target);

    if (target.files.length !== 1) {
      Utils.mensajeInformativo("Aviso", "Solo se permite un solo archivo.");
      return;
    }

    const reader: FileReader = new FileReader();

    reader.onload = (e: any) => {
      const bstr: string = e.target.result;
      const wb: XLSX.WorkBook = XLSX.read(bstr, { type: 'binary' });
      const wsname: string = wb.SheetNames[0];
      const ws: XLSX.WorkSheet = wb.Sheets[wsname];
      const dataRaw = XLSX.utils.sheet_to_json(ws, { defval: '' }) as any[];

      const _data: Colaborador[] = dataRaw.map(x => ({
        tipo: 1,
        idEleccion: this.eleccionSeleccionado,
        idProceso: this.procesoSeleccionada,
        tipoDocumento: String(x.tipoDocumento || ''),
        numeroDocumento: String(x.numeroDocumento || ''),
        nombre: String(x.nombre || ''),
        apellidoPaterno: String(x.apellidoPaterno || ''),
        apellidoMaterno: String(x.apellidoMaterno || ''),
        cargo: String(x.cargo || ''),
        sede: String(x.sede || ''),
        emaildifusion: String(x.correo || ''),
        estado: 1
      }));

      const combinados = this._Listcolaboradores.concat(_data);

      this._Listcolaboradores = combinados.filter(
        (item, index, self) =>
          index === self.findIndex(t => t.numeroDocumento === item.numeroDocumento)
      );
    };

    reader.readAsBinaryString(target.files[0]);
  }

  _CrearFila(): Colaborador {
    return {
      tipo: 1,
      idEleccion:this.eleccionSeleccionado,
      idProceso:this.procesoSeleccionada,
      tipoDocumento: 'DNI',
      numeroDocumento: '',
      nombre: '',
      apellidoPaterno: '',
      apellidoMaterno: '',
      emaildifusion: '',
      cargo: '',
      sede: '',
      estado : 1
    };
  }

  _AgregarFila(indice: number) {
    const nuevaFila = this._CrearFila();
    this._Listcolaboradores.splice(indice + 1, 0, nuevaFila);
  }


  async _QuitarFila(i: number) {
    const confirmado = await Utils.mensajeConfirmacion('¿Deseas eliminar este registro?');
    if (confirmado) {
      const item = this._Listcolaboradores[i];
      const _Lista: Colaborador[] = [item];

      if (item.tipo === 2) {
        _Lista[0].tipo = 3;
        
        this._Colaboradoresservice.add(_Lista).subscribe((response: any) => {
          if (response.status === 1) { 
              console.log(response.data);
          }
        });
      }

      this._Listcolaboradores.splice(i, 1);

    }
  }

  mensajes: string[] = [];
  mostrarMensajes: boolean = true;
  async _Iniciar(){
     const confirmado = await Utils.mensajeConfirmacion('¿Este SEGURO de iniciar Difusión?');

    if (confirmado) {
        this._Colaboradoresservice.difusion(this.eleccionSeleccionado).subscribe((response: any) => {
          console.log(response);
        if(response.status === 1){
          Utils.mensajeInformativo("Aviso", response.msg);
        }
        else {
          this.mensajes = response.data.map((n:any) => n.valor);  
          this.mostrarMensajes = true;
        }      
     });
    }
  }

}
