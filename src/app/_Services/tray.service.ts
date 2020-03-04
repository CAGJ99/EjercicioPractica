import {Injectable} from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';
import { config } from '../../config';
import { Tray } from '../models/tray';





@Injectable({
    providedIn: 'root'
})

export class TrayServices {
constructor(private http: HttpClient) {}
/*
// opciones Http
httpOptions = {
    headers: new HttpHeaders({
        'content-Type': 'application/json',
        Authorize: `Bearer ${localStorage.getItem('token')}`
    })
};*/

// BANDEJAS
getTray(): Observable <any> {
    return this.http.get<any>(`${config.apiUrl}trays`);
}
SearchTray(id: string): Observable<any> {
    return this.http.get(`${config.apiUrl}tray/` + id);
}

SearchDate(date: string):Observable<any> {
    return this.http.get(`${config.apiUrl}trays/dates/` + date);

}

getByUser(rut: string):Observable<any>{
    return this.http.get(`${config.apiUrl}trays/user/${rut}`);

}

getByDateRangeAndUser(term: string):Observable<any>{

    return this.http.get(`${config.apiUrl}trays/user/dates/${term}`);

}
getUbication(): Observable<any> {
    return this.http.get(`${config.apiUrl}trays/ubications`);
}

getByDateRange(term: string): Observable<any> {

    return this.http.get(`${config.apiUrl}trays/date/${term}`);
}
// Charts

getChartsMontly(): Observable<any> {
    return this.http.get<any>(`${config.apiUrl}charts/monthly`);
}

getChartYearly():Observable<any> {

    return this.http.get(`${config.apiUrl}charts/yearly`);
}

getChartDaily(): Observable<any> {

    return this.http.get(`${config.apiUrl}charts/daily`);
}


getByBarcode(codigoQr: string) {

    return this.http.get(`${config.apiUrl}trays/code/${codigoQr}`);
}

getType(tipo:string){
    return this.http.get(`${config.apiUrl}trays/type/${tipo}`);
}
}

