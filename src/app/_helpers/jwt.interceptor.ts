import { Injectable, Injector} from '@angular/core';
import {
    HttpEvent, HttpInterceptor, HttpHandler, HttpRequest
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthenticationService } from '../_Services/authentication.service';
import { config } from '../../config';



@Injectable()


export class JwInterceptor implements HttpInterceptor {
    constructor(private AuthService: AuthenticationService, private injector: Injector) {}
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const currentUser = this.AuthService.currentUserValue;
        if (currentUser && currentUser.token)
        {
            request = request.clone({
                setHeaders:{
                    authorization: `${currentUser.token}`
                }
            });
           }
        return next.handle(request);
        }
}

