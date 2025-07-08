import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { Colaborador } from '../models/colaboradores.models';

@Injectable({
  providedIn: 'root'
})

export class ColaboradoresService {

    public url: string;

    constructor(private http: HttpClient)
    {
        this.url = environment.apiUrl;
    }

    get(idEleccion: number = 0, idproceso:number): Observable<Colaborador[]>{
        const _get = environment.colaboradores_get;
        const rawToken = localStorage.getItem('Token');
        const token = rawToken?.replace(/^"+|"+$/g, '');
        const headers = new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        });
            
        const params = new HttpParams().set('IdEle', idEleccion).set('IdPro',idproceso);
        
        return this.http.get<Colaborador[]>(this.url + _get, { headers, params});    
    }
    
    // add(Listcolaborador: Colaborador[]) : Observable<any> {
    //     const _add = environment.candidato_add;
    //     const rawToken = localStorage.getItem('Token');
    //     const token = rawToken?.replace(/^"+|"+$/g, '');
    
    //     var header = new HttpHeaders({
    //         'Authorization': `Bearer ${token}`
    //     });
    
    //     const formData = new FormData();
    //     formData.append('ListColaborador', JSON.stringify(Listcolaborador)); 
    
    //     return this.http.post(this.url + _add, formData,{headers: header});    
    // }

    add(listaColaborador: Colaborador[]): Observable<any> {
        const _add = environment.colaboradores_add;
        const rawToken = localStorage.getItem('Token');
        const token = rawToken?.replace(/^"+|"+$/g, '');

        const headers = new HttpHeaders({
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        });

        return this.http.post(this.url + _add, listaColaborador, { headers });
    }

    
}