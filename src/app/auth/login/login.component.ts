import { Component, OnInit } from '@angular/core';
import { Router} from '@angular/router';
import { LoginService } from 'src/app/service/login.service';
import { UsuarioLogin } from 'src/app/models/usuario';
import { UsuarioModel } from 'src/app/models/usuario.model';

import Utils from 'src/app/utils/funciones.utils';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {
    public _usuario: any;    
    public _usuarioModel: any = UsuarioModel;
    public _ListMenu: any;
    public _ListSubMenu : any;

    /* CONSTRUCTOR */
    constructor(private _router: Router,private _LoginService : LoginService){ 

    }

    ngOnInit(): void {
      this._usuario = {
        correo: '',
        clave: ''
        };
    }   

    onIngresar(){       
      this.verificarLogin();
    }

    verificarLogin() {  
       this._LoginService.Login(new UsuarioLogin(this._usuario)).subscribe(response => {
        if(response.status==1)
        {
            this._usuarioModel = response.data;
            if(this._usuarioModel.apeMatPer == "")
            {
              this._router.navigateByUrl('/dashboard/perfil');
            }
            else
            {
                this._router.navigateByUrl('/dashboard');
            }
            
            this._ListMenu    = this._usuarioModel.listMenu;
            this._ListSubMenu = this._usuarioModel.listSubMenu;
                
            localStorage.setItem('Token',JSON.stringify(this._usuarioModel.token));
            localStorage.setItem('Menu', JSON.stringify(this._ListMenu));
            localStorage.setItem('SubMenu', JSON.stringify(this._ListSubMenu));                      
         }
         else
         {
           Utils.mensajeError(response.message);
         }

        localStorage.setItem('Usuario',JSON.stringify(this._usuarioModel));  

       },
       error => {
           Utils.mensajeError('Hubieron problemas en la conexión, por favor volver a intentarlo en unos minutos.');
      });
   }

}