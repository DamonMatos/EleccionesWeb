import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UsuarioLogin } from '../models/usuario';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  public url: string;

  constructor(private http: HttpClient)
  {
    this.url = environment.apiUrl + environment.user_login;
  }

  Login(login: UsuarioLogin): Observable<any> {
    const params = JSON.stringify(login);
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.post(this.url, params, {headers});
  }
}
