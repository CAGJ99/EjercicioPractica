import { Component } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { User } from '../../../models/user';
import { AuthenticationService } from 'src/app/_Services/authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-main-nav',
  templateUrl: './main-nav.component.html',
  styleUrls: ['./main-nav.component.css']
})

export class MainNavComponent {
drawer;
  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );
  currentUser: User;

  constructor(private breakpointObserver: BreakpointObserver,private router: Router,private AuthService:AuthenticationService) {
      this.AuthService.currentUser.subscribe(data =>
                  this.currentUser = data
                  );
}
  logout() {
    this.AuthService.logout();
    this.router.navigate(['/login']);
   }
}
