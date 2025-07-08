import { Component } from '@angular/core';
import { Elecciones } from 'src/app/models/elecciones.models';
import { PersonalModel } from 'src/app/models/personal.model';
import { Proceso } from 'src/app/models/proceso.models';
import { EleccionService } from 'src/app/service/eleccion.service';
import Utils from 'src/app/utils/funciones.utils';

declare var bootstrap: any;
@Component({
  selector: 'app-proceso',
  templateUrl: './proceso.component.html',
  styleUrls:['./proceso.component.css']
})

export class ProcesoComponent {
  public _PersonalModel: PersonalModel = new PersonalModel('');
  public _IdPersonal: number = 0;
  public _Ruc: string= "";
  public _IdCliente : number= 0;
  public _NombreCliente: string = ""; 

  public activeTab: any = 'tab1'; // O el ID de la primera pestaña que deseas mostrar


  public _ArchivoSeleccionado: File | null = null;

  public _ListarProceso : Proceso[] = [];
  public _ListarElecciones : Elecciones[] = []; 

  public pageNumber = 1;
  public pageSize = 10

  public _Elecciones: Elecciones = 
  { 
    tipo:1,
    idEleccion: 1, 
    idCliente: this._IdCliente, 
    ruc:'',
    nombre:'',
    colorBase:'',
    urlLogo:'',
    fechaDifusion:'',
    fechaInicio:'',
    fechaFin:'',
    fechaRegistro:'',
    planillaConfirmada:false,
    difusionEnviada:false, 
    estado: 1, 
    ListProceso: this._ListarProceso
  };

  constructor(private _Eleccionservice : EleccionService) { }

  ngOnInit(): void {
    this._Listar();
  }

  _Listar(){
    let _IdPersonal = 0;
    const _Usu = localStorage.getItem('Usuario'); 
    if (_Usu) {
       this._PersonalModel = JSON.parse(_Usu);
      _IdPersonal = this._PersonalModel.idPersonal;

      this._Eleccionservice.getDatos_Personal(_IdPersonal).subscribe((response: any) =>{
        if(response.status == 1 ){
          this._IdCliente = response.data[0].idCliente;
          this._NombreCliente = response.data[0].nombreCliente;
          this._Ruc = response.data[0].ruc;
          this._Get();
        }
        localStorage.setItem("IdCliente", this._IdCliente.toString());
        this._Elecciones.idCliente = this._IdCliente; 
        this._Elecciones.ruc = this._Ruc;      
      });
    }
   
    this._ListarProceso =
    [{ 
        tipo: 1,
        idEleccion: this._Elecciones.idEleccion, 
        idProceso : 1, 
        nombre : 'Proceso N°1', 
        numeroCandidatos : 0 , 
        votacionObligatoria : true
    }];
  }

  _Get(){
    this._Eleccionservice.get(this._IdCliente, this.pageNumber, this.pageSize).subscribe((response: any)=>{
      if(response.status == 1){
        this._ListarElecciones = response.data;
        console.log(this._ListarElecciones);
      }     
    });
  }

  _Editar(_Eleccion: Elecciones) {
    this._Elecciones = { ..._Eleccion };
    this._Elecciones.tipo = 2;
    this._Elecciones.fechaInicio = this._ConvertirFecha(this._Elecciones.fechaInicio);
    this._Elecciones.fechaFin = this._ConvertirFecha(this._Elecciones.fechaFin);
    this._Elecciones.fechaDifusion = this._ConvertirFecha(this._Elecciones.fechaDifusion);
    const Id = _Eleccion.idEleccion;
    this._Eleccionservice.getProceso(Id).subscribe((response:any)=>{
      if(response.status == 1){
          this._ListarProceso = response.data;
          this._Elecciones.ListProceso = this._ListarProceso;
        } 
    });

    console.log('Editando:', this._Elecciones);
  }

  _Guardar(){
    this._Elecciones.ListProceso = this._ListarProceso;
    this._Eleccionservice.add(this._Elecciones, this._ArchivoSeleccionado).subscribe((response:any)  => {
      if(response.status=1){
        Utils.mensajeInformativo("Aviso","Se Inicio con el proceso de Elección");
        this._Get();
      }
      else{
        Utils.mensajeError("Atento! No se pudo realizar el proceso de Elección");
      }      
    });
  }
  
  _SiguientePagina() {
    this.pageNumber++;
    this._Get();
  }

  _AnteriorPagina() {
    if (this.pageNumber > 1) {
      this.pageNumber--;
      this._Get();
    }
  }

  _CrearFila(id:number,nombre: string,obligatorio:true): Proceso {
    return {
      tipo:1,
      idEleccion: this._Elecciones.idEleccion,
      idProceso: id,
      nombre: nombre,
      numeroCandidatos: 0,
      votacionObligatoria: obligatorio
    };
  }

  _AgregarFila(indice: number) {
    const nuevaFila = this._CrearFila(this._ListarProceso.length + 1,'Proceso N°' + (this._ListarProceso.length + 1),true);
    this._ListarProceso.splice(indice + 1, 0, nuevaFila);
  }

  _QuitarFila(indice: number) {
    this._ListarProceso.splice(indice, 1);
  }

   _ConvertirFecha(fecha: string | null): string {
    if (!fecha) return '';
    return fecha.split('T')[0]; 
  }

  _GetTextColor(bgColor: string): string {
    if (!bgColor) return '#000';
    const c = bgColor.substring(1); 
    const rgb = parseInt(c, 16);   
    const r = (rgb >> 16) & 0xff; 
    const g = (rgb >> 8) & 0xff;  
    const b = (rgb >> 0) & 0xff;  
    const luminance = 0.299 * r + 0.587 * g + 0.114 * b;

    return luminance > 186 ? '#000' : '#fff';
  }

   _OnArchivoSeleccionado(event: Event) {
    const input = event.target as HTMLInputElement;

    if (input.files && input.files.length > 0) {
      this._ArchivoSeleccionado = input.files[0];
    } else {
      this._ArchivoSeleccionado = null; 
    }
  }


}
