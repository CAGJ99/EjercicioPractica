 import { Injectable } from '@angular/core';
 import { HttpClient} from '@angular/common/http';
 import { Observable } from 'rxjs';
 import { config } from '../../config';
 import { TypeTray } from '../models/typeTray';

 @Injectable({
    providedIn: 'root'
  })
 export class TypeTrayService {

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
createDetails(TYPE_TRAY:TypeTray ){

    return this.http.post(`${config.apiUrl}types`, TYPE_TRAY);
}

getTypes() {

    return this.http.get(`${config.apiUrl}types`);
}

updateTypes(tipo: string): Observable<TypeTray> {

    return this.http.put<TypeTray>(`${config.apiUrl}types/` , tipo);
}


deleteTypes(tipo: string): Observable<any> {
    return this.http.delete(`${config.apiUrl}types/` + tipo);

}

}
