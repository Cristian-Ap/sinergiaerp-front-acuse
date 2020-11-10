import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { GLOBAL } from './global'

@Injectable({
    providedIn:'root'
})
export class appService{
    private url = GLOBAL.url;

    constructor(
        private http : HttpClient){}

    obtenerDatos(token: string): Observable<any>{
        const headers = new HttpHeaders({
            'Content-type' : 'application/x-www-form-urlencoded',
        });
        return this.http.post(`${this.url}facelectro/getSingle/${token}`,{ headers: headers });
    }

    actualizarAcuse(id: number, data: object): Observable<any>{
        const headers = new HttpHeaders({
            'Content-type' : 'application/x-www-form-urlencoded',
        });
        return this.http.post(`${this.url}facelectro/updateSingle/${id}`, "json="+JSON.stringify(data) , { headers: headers })
    }
}
