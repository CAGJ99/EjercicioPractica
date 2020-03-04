import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatTableDataSource } from '@angular/material';
import { UserService } from '../../../_Services/user.service';
import { Router, ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-get-users',
  template: `
  <div class ="tittle">Busqueda de usuarios</div>
  <div class="container main-container">
  <mat-accordion>
  <mat-expansion-panel>
      <mat-expansion-panel-header>
          <mat-panel-title>
              Buscar Usuario
          </mat-panel-title>
          <mat-panel-description>
              digite el rut del usuario
          </mat-panel-description>
      </mat-expansion-panel-header>
      <form class="example-form">
      <mat-form-field class="example-full-width">
        <input matInput placeholder="digite Rut" #rut required="true">
      </mat-form-field>
      <button mat-raised-button color="accent" (click)="getRut(rut.value)"><i class="material-icons">
      search
      </i></button>
    </form>
  </mat-expansion-panel>
  <mat-expansion-panel (opened)="panelOpenState = true" (closed)="panelOpenState = false">
      <mat-expansion-panel-header>
          <mat-panel-title>
              Busqueda por nombre
          </mat-panel-title>
          <mat-panel-description>
            ingrese el nombre completo del usuario
          </mat-panel-description>
      </mat-expansion-panel-header>
      <mat-form-field class="example-full-width">
        <input matInput placeholder="Nombre" #nombre required="true">
      </mat-form-field>
      <mat-form-field class="example-full-width">
      <input matInput placeholder="Apellido Paterno" #apPat required="true">
    </mat-form-field>
    <mat-form-field class="example-full-width">
    <input matInput placeholder="Apellido Materno" #apMat required="true">
  </mat-form-field>
  <button mat-raised-button color="accent" (click)="getFulName(nombre.value,apPat.value,apMat.value)"><i class="material-icons">
  search
  </i></button>

  </mat-expansion-panel>

</mat-accordion>
<router-outlet></router-outlet>
<div>`
})
export class GetUsersComponent implements OnInit {
  users: any = [];
  displayedColumns: string[] = [];
  dataSource: any = [];
  //buscar x Rut
  rut:any;
  // buscar x Nombre
  fullName: string;
  panelOpenState;
  constructor(
    private UserApi: UserService,
    private router: Router,
    private actRoute: ActivatedRoute
  ) { }
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  ngOnInit() {

   this.getUser();
  }


  getUser() {
    return this.UserApi.getUsers()
    .subscribe( data => {
         // console.log(data);
          this.users = data;
          this.displayedColumns = ['detalles', 'codigoqr', 'fechaIngreso', 'ubicacion'];
          this.dataSource = new MatTableDataSource<any>(this.users.cantidad);
          this.dataSource.paginator = this.paginator;


    });
  }

  getRut(rut:string){
    this.rut=rut;
    this.router.navigate(['search-user', this.rut], {relativeTo:this.actRoute});

  }

  getFulName(nombre: any, apPat: any, apMat: any ) {
    const NOMBRE = nombre;
    const APPAT = apPat;
    const APMAT = apMat;
    this.fullName = NOMBRE + '&' + APPAT + '&' + APMAT;
    // console.log(this.fullName);
    this.router.navigate(['get-user-name', this.fullName], {relativeTo: this.actRoute});

  }
}
