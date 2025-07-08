import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { PersonalModel } from 'src/app/models/personal.model';
import { Observable } from 'rxjs';
import { Elecciones } from '../models/elecciones.models';
import { Proceso } from '../models/proceso.models';

@Injectable({
  providedIn: 'root'
})
export class EleccionService {
  public url: string;

    constructor(private http: HttpClient)
    {
      this.url = environment.apiUrl;
    }

  getDatos_Personal(idPersonal: number): Observable<PersonalModel[]> {
      const _Cliente = environment.cliente_get;
      const rawToken = localStorage.getItem('Token');
      const token = rawToken?.replace(/^"+|"+$/g, '');
      const headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
      });
      const params = new HttpParams().set('Id', idPersonal);

      return this.http.get<PersonalModel[]>(this.url + _Cliente, { headers, params});
  }

  get(idCliente: number = 0, pageNumber: number = 1, pageSize: number = 10): Observable<Elecciones[]>{
      const _Elecciones = environment.elecciones_get;
      const rawToken = localStorage.getItem('Token');
      const token = rawToken?.replace(/^"+|"+$/g, '');
      const headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
      });
      const params = new HttpParams().set('Id', idCliente).set('pageNumber',pageNumber).set('pageSize',pageSize);

      return this.http.get<Elecciones[]>(this.url + _Elecciones, { headers, params});

  }

  add(eleccion: Elecciones, imagen: File | null) : Observable<any> {
      const _update = environment.elecciones_add;
      const rawToken = localStorage.getItem('Token');
      const token = rawToken?.replace(/^"+|"+$/g, '');

      var header = new HttpHeaders({
        'Authorization': `Bearer ${token}`
      });

      const formData = new FormData();
      formData.append('Elecciones', JSON.stringify(eleccion)); 

      if (imagen) {
          formData.append('file', imagen); 
      }

      return this.http.post(this.url + _update, formData,{headers: header});
  }


  getProceso(id: number = 0): Observable<Proceso[]>{
      const _Proceso = environment.proceso_get;
      const rawToken = localStorage.getItem('Token');
      const token = rawToken?.replace(/^"+|"+$/g, '');
      const headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
      });
      const params = new HttpParams().set('Id', id);

      return this.http.get<Proceso[]>(this.url + _Proceso, { headers, params});

   }

   getLista(tipo: number, id: number): Observable<any[]>{
      const _Lista = environment.elecciones_listadespegable;
      const params = new HttpParams().set('Tipo', tipo).set('Id',id);

      return this.http.get<any[]>(this.url + _Lista, { params });

   }

   

 





}