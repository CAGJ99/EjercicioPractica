import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { config } from '../../config';
import { Observable } from 'rxjs';
import { Ubication } from '../models/ubication';




@Injectable(
        {providedIn: 'root'
    })

export class UbicationService {
constructor(private http: HttpClient){}

getUbications():Observable<Ubication>{
   return this.http.get<Ubication>(`${config.apiUrl}ubication`);
}

createUbications(ubct: Ubication):Observable<Ubication>{
    return this.http.post<Ubication>(`${config.apiUrl}ubication`, ubct);
}

deleteUbication(id: number): Observable<Ubication> {
    return this.http.delete<Ubication>(`${config.apiUrl}ubication/${id}`);
}

updateUbication(id: string, ubct: Ubication): Observable<Ubication> {

   console.log('id: ' + id, 'usuario: ' + ubct);
   return this.http.put<Ubication>(`${config.apiUrl}ubication/${id}`, ubct);
}


getUbications2(){
    return this.http.get(`${config.apiUrl}ubication`);
 }
 

}
