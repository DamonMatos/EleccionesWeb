import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Candidatos } from '../models/candidatos.models';

@Injectable({
  providedIn: 'root'
})
export class CandidatosService {
public url: string;

  constructor(private http: HttpClient)
  {
    this.url = environment.apiUrl;
  }

  get(idEleccion: number = 0, idproceso:number): Observable<Candidatos[]>{
      const _get = environment.candidato_get;
      const rawToken = localStorage.getItem('Token');
      const token = rawToken?.replace(/^"+|"+$/g, '');
      const headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
      });
          
    const params = new HttpParams().set('IdEle', idEleccion).set('IdPro',idproceso);
    
    return this.http.get<Candidatos[]>(this.url + _get, { headers, params});    
  }

  add(candidatos: Candidatos, imagen: File | null) : Observable<any> {
      const _add = environment.candidato_add;
      const rawToken = localStorage.getItem('Token');
      const token = rawToken?.replace(/^"+|"+$/g, '');
  
      var header = new HttpHeaders({
        'Authorization': `Bearer ${token}`
      });
  
      const formData = new FormData();
      formData.append('Candidatos', JSON.stringify(candidatos)); 
  
      if (imagen) {
        formData.append('file', imagen); 
      }

    return this.http.post(this.url + _add, formData,{headers: header});
  }
}
