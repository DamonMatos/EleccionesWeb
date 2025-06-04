import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { UsuarioLogin } from '../models/usuario';
import { PersonalModel } from '../models/personal.model';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  public url: string;

  constructor(private http: HttpClient){
      this.url = environment.apiUrl;
  }
  
  Add(login: UsuarioLogin): Observable<any> 
  {
    const _add = environment.user_add;
    const params = JSON.stringify(login);
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.post(this.url + _add, params, { headers });
  }

  Update(personal: PersonalModel, imagen: File | null) : Observable<any> {
    const _update = environment.user_update;
    const rawToken = localStorage.getItem('Token');
    const token = rawToken?.replace(/^"+|"+$/g, '');

    var header = new HttpHeaders({
       'Authorization': `Bearer ${token}`
    });

    const formData = new FormData();
    formData.append('Personal', JSON.stringify(personal)); 

    if (imagen) {
        formData.append('file', imagen); 
    }

    return this.http.post(this.url + _update, formData,{headers: header});
  }



}
