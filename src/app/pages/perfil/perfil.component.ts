import { HttpClient } from '@angular/common/http';
import { Component, ViewEncapsulation  } from '@angular/core';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { PersonalModel } from 'src/app/models/personal.model';
import { UsuarioService } from 'src/app/service/usuario.service';
import Utils from 'src/app/utils/funciones.utils';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: [],
  encapsulation: ViewEncapsulation.None
})

export class PerfilComponent {
  // userForm!: FormGroup;
  _PersonalModel: PersonalModel = new PersonalModel('');

  archivoSeleccionado: File | null = null;

  constructor(private http: HttpClient, private usuarioservice : UsuarioService) {
  }

    onArchivoSeleccionado(event: Event) {
    const input = event.target as HTMLInputElement;

    if (input.files && input.files.length > 0) {
      this.archivoSeleccionado = input.files[0];
    } else {
      this.archivoSeleccionado = null; 
    }
  }

   ngOnInit(): void {
     const _Usu = localStorage.getItem('Usuario'); 
     if (_Usu) {
       this._PersonalModel = JSON.parse(_Usu);
       this._PersonalModel.fehNacPer = this._PersonalModel.fehNacPer.split('T')[0];
     }     
  }  

  
   enviar() {
      this._PersonalModel.FotPer = this._PersonalModel.numDocPer.trim() + '.JPG';
      this.usuarioservice.Update(this._PersonalModel, this.archivoSeleccionado)
        .subscribe(response  => {
          Utils.mensajeInformativo("Aviso","Se registro correctamente su Datos");
    });
  }


}
