import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { map} from 'rxjs/operators';
import { User } from '../models/user';
import { Observable, BehaviorSubject } from 'rxjs';
import { config } from '../../config';
import { Localconfig } from '../../localConfig';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;
 // apiURL = 'http://api-grbm.herokuapp.com';
  // opciones Http
  /*httpOptions = {
    headers: new HttpHeaders({
        'content-Type': 'application/json'
    })
  };*/
  constructor(private http: HttpClient) {
    this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
    this.currentUser =  this.currentUserSubject.asObservable();
   }

   public get currentUserValue(): User {
    return this.currentUserSubject.value;
  }
   register(user: User) {
     return this.http.post(`${config.apiUrl}user`, user);
  }
  
  login(rut: string, password: string) {
    return this.http.post<any>(`${config.apiUrl}login`, { rut, password }).
    pipe(map(user => {
      if (user && user.token) {
        localStorage.setItem('currentUser', JSON.stringify(user));
        this.currentUserSubject.next(user);
      }
      return user;
    }));


  }

logout() {
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
  }
}
