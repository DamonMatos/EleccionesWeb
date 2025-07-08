import { Component } from '@angular/core';
import { Candidatos } from 'src/app/models/candidatos.models';
import { CandidatosService } from 'src/app/service/candidatos.service';
import { EleccionService } from 'src/app/service/eleccion.service';
import Utils from 'src/app/utils/funciones.utils';

//declare var bootstrap: any;

@Component({
  selector: 'app-candidato',
  templateUrl: './candidato.component.html',
  styleUrls: ['./candidato.component.css']
})
export class CandidatoComponent {
  public activeTab: any = 'tab1';
  public _ArchivoSeleccionado: File | null = null;
  public _Tipo : number= 1;
  public _Id: number= 0;

  public eleccionSeleccionado: number | 0 = 0;
  public procesoSeleccionada:  number | 0 = 0;

  public _ListaEle :any[]= [];
  public _ListaPro :any[]= [];

  public _ListCandidatos: Candidatos[]= [];

  public deshabilitado: boolean = false;

  Desabilitar() {
    this.deshabilitado = true;
  }

  public _Candidato: Candidatos = 
    { 
      tipo:1,
      idEleccion: 1, 
      idproceso: 1, 
      idcandidato:1,
      tipoDocumento: '',
      numeroDocumento:'',
      nombre:'',
      apellidos:'',
      nombreCompleto:'',
      area:'',
      localidad:'',
      urlFile:'',
      descripcion:''
    };

  constructor(private _Eleccionservice : EleccionService,private _Candidatosservice: CandidatosService) { }

   ngOnInit(): void {
    this._Listar();
  }

  _Listar(){
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

  _Get(){
    const _idEleccion = this.eleccionSeleccionado;
    const _idproceso  = this.procesoSeleccionada;
    this._Candidatosservice.get(_idEleccion, _idproceso).subscribe((response: any) => {
      if(response.status = 1){
        this._ListCandidatos = response.data;
      }
    });
  }
   
  _Guardar(){
    this._Candidato.idEleccion     = this.eleccionSeleccionado;
    this._Candidato.idproceso      = this.procesoSeleccionada;
    this._Candidato.nombreCompleto = this._Candidato.nombre + ' ' + this._Candidato.apellidos;

    this._Candidatosservice.add(this._Candidato, this._ArchivoSeleccionado).subscribe((response:any)  => {
      if(response.status = 1){
        Utils.mensajeInformativo("Aviso","se registro correctamente el candidato");
        this._Get();
      }          
    });
  }

  _Editar(candidato: Candidatos) {
    this.Desabilitar();
    this._Candidato = { ...candidato };
    const resultado = this._SepararNombreApellido(this._Candidato.nombreCompleto);
    this._Candidato.tipo = 2;
    this._Candidato.nombre = resultado.nombres;
    this._Candidato.apellidos = resultado.apellidos;
  }

  async _Eliminar(candidato: Candidatos) {
    const confirmado = await Utils.mensajeConfirmacion('¿Deseas eliminar este registro?');
    if (confirmado) {
        candidato.tipo = 3;
        this._Candidatosservice.add(candidato, this._ArchivoSeleccionado).subscribe((response:any)  => {
        if(response.status === 1){
          this._Get();
        }          
      });
    }
  }


  _OnArchivoSeleccionado(event: Event) {
    const input = event.target as HTMLInputElement;

    if (input.files && input.files.length > 0) {
      this._ArchivoSeleccionado = input.files[0];
    } else {
      this._ArchivoSeleccionado = null; 
    }
  }

  _SepararNombreApellido(nombreCompleto: string): { nombres: string, apellidos: string } {
    const partes = nombreCompleto.trim().split(/\s+/);

    let nombres = '';
    let apellidos = '';

    switch (partes.length) {
      case 2:
        nombres = partes[0];
        apellidos = partes[1];
        break;
      case 3:
        nombres = partes[0];
        apellidos = partes.slice(1).join(' ');
        break;
      case 4:
        nombres = partes.slice(0, 2).join(' ');
        apellidos = partes.slice(2).join(' ');
        break;
      default:
        nombres = partes.slice(0, 2).join(' ');
        apellidos = partes.slice(2).join(' ');
        break;
    }

    return { nombres, apellidos };
  }

}
