import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
    providedIn:'root'
})
export class appService{
    private url = "http://dev.nuevoerp.co:8017/api/";

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