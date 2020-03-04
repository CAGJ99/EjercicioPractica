import { BrowserModule } from '@angular/platform-browser';
// modulo HTTP para la api
import { HttpClientModule, HTTP_INTERCEPTORS, HttpInterceptor } from '@angular/common/http';
/// fecha
import { LOCALE_ID, NgModule } from '@angular/core';
import locales from '@angular/common/locales/es';

import {ReactiveFormsModule} from '@angular/forms';

// rutas
import { APP_ROUTING } from './app.routes';
// componentes
import { SearchDateRangeComponent } from './components/TrayComponents/search-date-range/search-date-range.component';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { TrayListComponent } from './components/TrayComponents/tray-list/tray-list.component';
import { TrayComponent } from './components/TrayComponents/tray/tray.component';
import { registerLocaleData } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// materiales
import { MaterialModule} from './material/material.module';
import { SearchDateComponent } from './components/TrayComponents/search-date/search-date.component';
import { VerticalTimelineModule } from 'angular-vertical-timeline';
import { LoginComponent } from './_auth/login/login.component';
import { RegisterComponent } from './components/UserComponets/register/register.component';
import { FormsModule } from '@angular/forms';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

// datepicker
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';

// interceptor
import { JwInterceptor } from './_helpers/jwt.interceptor';
import { ErrorInterceptor } from './_helpers/error.interceptor';
import { SearchBarcodeComponent } from './components/TrayComponents/search-barcode/search-barcode.component';
import { GetUsersComponent } from './components/UserComponets/get-users/get-users.component';
import { UpdateUsersComponent } from './components/UserComponets/update-users/update-users.component';
import { SearchUserComponent } from './components/UserComponets/search-user/search-user.component';
import { SearchTrayUserComponent } from './components/TrayComponents/search-tray-user/search-tray-user.component';
import { TrayDateRangeUserComponent } from './components/TrayComponents/tray-date-range-user/tray-date-range-user.component';
import { GetTypeTrayComponent } from './components/TypeTray/get-type-tray/get-type-tray.component';
import { CreateTypeTrayComponent } from './components/TypeTray/create-type-tray/create-type-tray.component';
import { SearchNameComponent } from './components/UserComponets/search-name/search-name.component';
import { MainNavComponent } from './components/shared/main-nav/main-nav.component';
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { UbicationListComponent } from './components/UbicationComponents/ubication-list/ubication-list.component';
import { CreateUbicationsComponent } from './components/UbicationComponents/create-ubications/create-ubications.component';
import { MatPaginatorModule } from '@angular/material/paginator';
import { SearchTypeTrayComponent } from './components/TrayComponents/search-type-tray/search-type-tray.component';




registerLocaleData(locales);
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    TrayListComponent,
    TrayComponent,
    SearchDateComponent,
    LoginComponent,
    RegisterComponent,
    SearchDateRangeComponent,
    SearchBarcodeComponent,
    GetUsersComponent,
    UpdateUsersComponent,
    SearchUserComponent,
    SearchTrayUserComponent,
    TrayDateRangeUserComponent,
    GetTypeTrayComponent,
    CreateTypeTrayComponent,
    SearchNameComponent,
    MainNavComponent,
    UbicationListComponent,
    CreateUbicationsComponent,
    SearchTypeTrayComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    APP_ROUTING,
    BrowserAnimationsModule,
    MaterialModule,
    ReactiveFormsModule,
    VerticalTimelineModule,
    FormsModule,
    NgbModule,
    BsDatepickerModule.forRoot(),
    LayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatPaginatorModule



  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: JwInterceptor, multi: true },
    {provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true},
    {provide: LOCALE_ID, useValue: 'es'}],
  bootstrap: [AppComponent]
})
export class AppModule { }
