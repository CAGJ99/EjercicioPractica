import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';
import { config } from '../../config';
import { User } from '../models/user';
import { Localconfig } from '../../localConfig';




@Injectable({
    providedIn: 'root'
})
export class UserService {
 constructor(private http: HttpClient) {}
 /*httpOptions = {
   headers: new HttpHeaders({
       'content-Type': 'application/json',
       'Access-Control-Allow-Origin':' *',
       'Access-Control-Allow-Headers': 'X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Request-Method',
       'Access-Control-Allow-Methods':'GET, POST, OPTIONS, PUT, DELETE',
       'Allow': 'GET, POST, OPTIONS, PUT, DELETE'

   })
};*/

 getUsers(): Observable<any> {

    return this.http.get(`${config.apiUrl}users`);
 }

 getUserByRut(rut: string): Observable<any> {

    return this.http.get(`${config.apiUrl}user/rut/${rut}`);
 }

 deleteUser(id: number) {
     return this.http.delete(`${config.apiUrl}user/${id}`);
 }

 updateUser(id: string, usuario: User): Observable<User> {

    console.log('id: ' + id, 'usuario: ' + usuario);
    return this.http.put<User>(`${config.apiUrl}user/${id}`, usuario);
 }
 getUserByName(term: string): Observable<any> {
console.log(term);
return this.http.get(`${config.apiUrl}user/name/${term}`);

}
}
