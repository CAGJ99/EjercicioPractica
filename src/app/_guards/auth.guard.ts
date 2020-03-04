import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthenticationService } from '../_Services/authentication.service';

@Injectable({providedIn: 'root'})
export class AuthGuard implements CanActivate {
  constructor(
    private router: Router,
    private AuthService: AuthenticationService) { }

  canActivate(route: ActivatedRouteSnapshot, state:RouterStateSnapshot) {

    const currentUser = this.AuthService.currentUserValue;
    if (currentUser) {
      return true;
    }

    this.router.navigate(['login'], { queryParams: { returnUrl: state.url } });
    return false;
  }
}
