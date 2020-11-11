import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { GLOBAL } from './admin/global'

@Injectable({
    providedIn:'root'
})
export class appService{
    private url = GLOBAL.url;

    constructor(
        private http : HttpClient){}

    obtenerDatos(token: string): Observable<any>{
        console.log(token);
        const headers = new HttpHeaders({
            'Content-type' : 'application/x-www-form-urlencoded',
        });
        return this.http.post(`${this.url}facelectro/getSingle/${token}`,{ headers: headers });
    }

    actualizarAcuse(token:string, data: object): Observable<any>{
        const headers = new HttpHeaders({
            'Content-type' : 'application/x-www-form-urlencoded',
        });
        return this.http.post(`${this.url}facelectro/updateSingle/${token}`, "json="+JSON.stringify(data) , { headers: headers })
    }
}
