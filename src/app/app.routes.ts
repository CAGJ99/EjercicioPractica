import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
// Auth Component
import { LoginComponent } from './_auth/login/login.component';
// Componente Bandejas
import { TrayListComponent } from './components/TrayComponents/tray-list/tray-list.component';
import { TrayComponent } from './components/TrayComponents/tray/tray.component';
import { SearchDateRangeComponent } from './components/TrayComponents/search-date-range/search-date-range.component';
import { SearchBarcodeComponent } from './components/TrayComponents/search-barcode/search-barcode.component';
import {SearchDateComponent} from './components/TrayComponents/search-date/search-date.component';
import { SearchTrayUserComponent } from './components/TrayComponents/search-tray-user/search-tray-user.component';
import { TrayDateRangeUserComponent } from './components/TrayComponents/tray-date-range-user/tray-date-range-user.component';
import { SearchTypeTrayComponent } from './components/TrayComponents/search-type-tray/search-type-tray.component';

// User Component
import { RegisterComponent } from './components/UserComponets/register/register.component';
import { GetUsersComponent } from './components/UserComponets/get-users/get-users.component';
import { SearchUserComponent } from './components/UserComponets/search-user/search-user.component';
import { UpdateUsersComponent } from './components/UserComponets/update-users/update-users.component';
import { SearchNameComponent } from './components/UserComponets/search-name/search-name.component';
// Ubications
import { UbicationListComponent } from './components/UbicationComponents/ubication-list/ubication-list.component';


// type Tray
import { CreateTypeTrayComponent } from './components/TypeTray/create-type-tray/create-type-tray.component';
import { GetTypeTrayComponent } from './components/TypeTray/get-type-tray/get-type-tray.component';
// guard
import { AuthGuard } from './_guards/auth.guard';
import { CreateUbicationsComponent } from './components/UbicationComponents/create-ubications/create-ubications.component';




const APP_ROUTES: Routes = [

    {path: '', component: HomeComponent, canActivate: [AuthGuard] }, // canActivate: [AuthGuard]
    // login
    {path: 'login', component: LoginComponent},
    // Tray
    {path: 'tray-list',  canActivate: [AuthGuard], component: TrayListComponent,
    children: [
    {path: 'search-date/:term', component: SearchDateComponent, canActivate: [AuthGuard]},
    {path: 'search-dateRange/:term', component: SearchDateRangeComponent, canActivate: [AuthGuard]},
    {path: 'search-barcode/:codigoQr', component: SearchBarcodeComponent, canActivate: [AuthGuard]},
    {path: 'search-tray-user/:rut', component: SearchTrayUserComponent, canActivate: [AuthGuard]},
    {path: 'tray-date-range-user/:termino', component: TrayDateRangeUserComponent, canActivate: [AuthGuard]},
    {path: 'trays/type/:tipo', component: SearchTypeTrayComponent, canActivate: [AuthGuard]},
     ]},
    {path: 'tray/:id', component: TrayComponent, canActivate: [AuthGuard]},
    // users
    {path: 'register', component: RegisterComponent, canActivate: [AuthGuard]},
    {path: 'update-user/:id', component: UpdateUsersComponent, canActivate: [AuthGuard]},
    {path: 'get-users', component: GetUsersComponent, children: [
    {path: 'search-user/:rut', component: SearchUserComponent, canActivate: [AuthGuard]},
    {path: 'get-user-name/:name', component: SearchNameComponent, canActivate: [AuthGuard]},
    ]},
    // ubication
    {path: 'ubication-list', component: UbicationListComponent, canActivate: [AuthGuard]},
    {path: 'create-ubication', component: CreateUbicationsComponent, canActivate: [AuthGuard]},
    {path: 'edit-ubication/:id', component: CreateUbicationsComponent, canActivate: [AuthGuard]},
   // type Tray
   
   {path: 'register/traytype', component: CreateTypeTrayComponent, canActivate: [AuthGuard]},
   {path: 'traytype/list', component: GetTypeTrayComponent, canActivate: [AuthGuard]},
     // canActivate: [AuthGuard]
    {path: '**', redirectTo:''}
// canActivate: [HomeGuard], canLoad: [HomeGuard]
//

];


export const APP_ROUTING = RouterModule.forRoot(APP_ROUTES, { useHash: true });  // { useHash: true }

