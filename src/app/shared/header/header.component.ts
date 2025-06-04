import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsuarioModel } from 'src/app/models/usuario.model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styles: [
  ]
})
export class HeaderComponent implements OnInit {
  public _Nombre : String = "";
  public _Correo : String = "";
  public _Perfil : String = "";
  public imagenBase64 : String = "";
  _UsuarioModel: UsuarioModel = new UsuarioModel("");
  
  constructor(private router: Router) {
    
  }
  ngOnInit(): void {
   const _Token = localStorage.getItem('Token');

   const datos = localStorage.getItem('Usuario');
    if (datos) {
      this._UsuarioModel = JSON.parse(datos);
      this._Nombre = this._UsuarioModel.nomPer + ' ' + this._UsuarioModel.apePatPer + ' ' + this._UsuarioModel.apeMatPer; 
      this._Correo = this._UsuarioModel.correo;
      this._Perfil = this._UsuarioModel.perfil;
      this.imagenBase64 = this._UsuarioModel.fotoBase64;

    }
    
  }

  cerrarSesion(): void {
    localStorage.removeItem('Token');
    localStorage.removeItem('Menu');
    localStorage.removeItem('SubMenu');    
    localStorage.removeItem('Usuario');
    this.router.navigate(['/login']);
  }

}
