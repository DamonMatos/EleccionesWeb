import { Component } from '@angular/core';
import { FormBuilder, Validators,FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { UsuarioLogin } from 'src/app/models/usuario';
import { UsuarioService } from 'src/app/service/usuario.service';

import Utils from 'src/app/utils/funciones.utils';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  registerForm: FormGroup;
  submitted = false;

  constructor(private _router: Router,private fb: FormBuilder, private servicio_usuario: UsuarioService){
    this.registerForm = this.fb.group({
      correo: ['', [Validators.required, Validators.email]],
      clave: ['', [Validators.required, Validators.minLength(6)]],
      repetirclave: ['', [Validators.required]]
    }, {
      validators: this.passwordMatchValidator
    });
    
  }

  get f() {
      return this.registerForm.controls;
  }


  passwordMatchValidator(form: FormGroup) {
    const password = form.get('clave')?.value;
    const confirm = form.get('repetirclave')?.value;
    return password === confirm ? null : { passwordMismatch: true };
  }

 
  NuevoUsuario(){
    this.submitted = true;

    if (this.registerForm.invalid) {
      return;
    }

    const _Usuario ={
      correo : this.registerForm.value.correo,
      clave : this.registerForm.value.clave,
    }

    this.servicio_usuario.Add(new UsuarioLogin(_Usuario)).subscribe(response => {
      if(response.status == 1)
      {
        Utils.mensajeInformativo("Aviso","Gracias por registrarte al sistema Administrativo");
        this._router.navigateByUrl('/login');    
      }

    });

  }






}
