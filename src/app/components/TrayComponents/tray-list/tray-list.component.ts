import { Component, OnInit, ViewChild, Input} from '@angular/core';
import { TrayServices } from '../../../_Services/tray.service';
import { Router, ActivatedRoute } from '@angular/router';
import { MatTableDataSource, MatPaginator, MatDialog } from '@angular/material';
import { Tray } from '../../../models/tray';
import * as _moment from 'moment';
const moment = _moment;
import {MatDatepickerInputEvent} from '@angular/material/datepicker';
import { NgModel, FormControl } from '@angular/forms';
import { TypeTrayService } from '../../../_Services/TypeTray.service';


@Component({
  selector: 'app-tray-list',
  template: ` 
  <div class ="tittle">Busqueda de Bandejas</div>
  <div class="container main-container">
  <mat-accordion>
  <mat-expansion-panel>
      <mat-expansion-panel-header>
          <mat-panel-title>
              Busqueda por fecha
          </mat-panel-title>
          <mat-panel-description>
              Selecciona una fecha
          </mat-panel-description>
      </mat-expansion-panel-header>
      <mat-form-field>
          <input matInput [matDatepicker]="picker" placeholder="" (dateInput)="obtenerFecha('input', $event)">
          <mat-datepicker-toggle matSuffix [for]="picker"></mat-datepicker-toggle>
          <mat-datepicker #picker></mat-datepicker>
      </mat-form-field>
  </mat-expansion-panel>
  <mat-expansion-panel (opened)="panelOpenState = true" (closed)="panelOpenState = false">
      <mat-expansion-panel-header>
          <mat-panel-title>
              Busqueda por rango de fechas
          </mat-panel-title>
          <mat-panel-description>
              Selecciona un Rango de Fechas
          </mat-panel-description>
      </mat-expansion-panel-header>
      <mat-error *ngIf="error">{{error}}</mat-error>
      <div class="contenedor">
      <input id="rangeDate" name="rangeDate" #input="ngModel" [(ngModel)]="rangeDate" type="text" bsDaterangepicker class="form-control"/>
      </div>
      <button mat-raised-button color="accent" (click)="obtainDate(input.viewModel)"><i class="material-icons">
      search
      </i></button>
  </mat-expansion-panel>
  <mat-expansion-panel (opened)="panelOpenState = true" (closed)="panelOpenState = false">
  <mat-expansion-panel-header>
      <mat-panel-title>
              Busqueda por codigo QR
      </mat-panel-title>
      <mat-panel-description>
              Escribe el codigo 
      </mat-panel-description>
  </mat-expansion-panel-header>
  <form class="example-form">
  <mat-form-field class="example-full-width">
    <input matInput placeholder="CodigoQR" #codigoqr required="true">
  </mat-form-field>
  <button mat-raised-button color="accent" (click)="obtainBarCode(codigoqr.value)"><i class="material-icons">
  search
  </i></button>
</form>
</mat-expansion-panel>
<mat-expansion-panel (opened)="panelOpenState = true" (closed)="panelOpenState = false">
  <mat-expansion-panel-header>
      <mat-panel-title>
              Busqueda por tipo
      </mat-panel-title>
      <mat-panel-description>
              Selecciona el tipo
      </mat-panel-description>
  </mat-expansion-panel-header>
  <form class="example-form" >
  <mat-form-field>
    <mat-label>Tipo</mat-label>
      <mat-select [formControl]="tipoControl">
          <mat-option *ngFor="let tipoBandeja of tipos;let i = index" [value]="tipoBandeja" (click)="getType(tipoBandeja.tipo)">
          {{tipoBandeja.tipo}}
          </mat-option>
      </mat-select>
    </mat-form-field>
</form>
</mat-expansion-panel>
<mat-expansion-panel (opened)="panelOpenState = true" (closed)="panelOpenState = false">
  <mat-expansion-panel-header>
      <mat-panel-title>
               Historial de Usuario
      </mat-panel-title>
      <mat-panel-description>
              Escribe el rut del usuario
      </mat-panel-description>
  </mat-expansion-panel-header>
  <form class="example-form2">
  <mat-form-field class="example-full-width">
    <input matInput placeholder="Rut" #rut required="true">
  </mat-form-field>
  <button mat-raised-button color="accent" (click)="sendRut(rut.value)"><i class="material-icons">
  search
  </i></button>
</form>
</mat-expansion-panel>
<mat-expansion-panel (opened)="panelOpenState = true" (closed)="panelOpenState = false">
  <mat-expansion-panel-header>
      <mat-panel-title>
              Busqueda Avanzada
      </mat-panel-title>
      <mat-panel-description>
              Ingresa los campos requeridos
      </mat-panel-description>
  </mat-expansion-panel-header>
  <mat-error *ngIf="error">{{error}}</mat-error>
  <div class="contenedor">
  <input id="dateRange2" name="rangeDate2" #input2="ngModel" [(ngModel)]="rangeDate2" type="text" bsDaterangepicker class="form-control" />
  </div>
<mat-form-field class="generic-fields">
<input matInput placeholder="Rut" required="true" #rut2>
</mat-form-field>
<button mat-raised-button color="accent" (click)="searchByDateRangeAndUser(input2.viewModel,rut2.value)"><i class="material-icons">
search
</i></button>

</mat-expansion-panel>
</mat-accordion>
<router-outlet></router-outlet>
<div>`,
  styleUrls: ['./tray-list.component.css']

})



export class TrayListComponent implements OnInit {
  model1: Date;
  panelOpenState = false;
  error: any;
    // Mostrar Bandejas
    tipoControl = new FormControl();
    tray: any = [];
    displayedColumns: string[] = [];
    dataSource: any = [];
    Filtros
   fechas: any;
   fecha2: any;
   fecha1: any;
   consulta: any;
   fecha: any;
   unArray: any = [];
   codigoqr: string;
   rangeDate2;
   rangeDate;
   // busqueda por user
   rut: any;
   // busqueda por fecha y user
   RutxFecha:any;
   respuesta:any=[];
   tipos:any =[];
constructor(
    private trayApi: TrayServices,
    private router: Router,
    public dialog: MatDialog,
    private actRoute: ActivatedRoute,
    private typeApi:TypeTrayService
  ) {
  }

@ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  events: string[] = [];
  ngOnInit() {
    this.typeApi.getTypes()
    .subscribe(datos=>{
       this.respuesta  = datos;
       this.tipos = this.respuesta.detalleDB;
    });

  }

  verBandejas(idx) {

   this.router.navigate(['/tray', idx]);

  }

obtenerFecha(fecha , event: MatDatepickerInputEvent<Date>) {
  this.events.push(`${moment(event.value).format('YYYY-MM-DD')}`);
  fecha = this.events.pop();
  this.router.navigate(['search-date', fecha], {relativeTo: this.actRoute});
}
  // Filtro X Rango de Fechas
  obtainDate(term) {
    if(term ===undefined)
    {
      this.error = 'ingrese rango de fechas!'
    }
    else{
     this.error='';
     this.fechas = term;
     this.fecha1 = moment(this.fechas[0]).format('YYYY-MM-DD');
     this.fecha2 = moment(this.fechas[1]).format('YYYY-MM-DD');
     this.consulta = this.fecha1 + '&' + this.fecha2;
     this.router.navigate(['search-dateRange/', this.consulta], {relativeTo: this.actRoute});
    }}

obtainBarCode(codigoqr: string) {

  this.codigoqr = codigoqr;
  this.router.navigate(['search-barcode/', this.codigoqr], {relativeTo: this.actRoute});
}

sendRut(rut: string) {
 this.rut = rut;
 this.router.navigate(['search-tray-user/', this.rut], {relativeTo: this.actRoute} );

}


searchByDateRangeAndUser(daterange, rut) {
  if(daterange ===undefined)
  {
    this.error = 'ingrese rango de fechas!';
  }
  else{
  this.error='';
  this.rut = rut;
  this.fechas = daterange;
  this.fecha1 = moment(this.fechas[0]).format('YYYY-MM-DD');
  this.fecha2 = moment(this.fechas[1]).format('YYYY-MM-DD');
  this.RutxFecha = this.rut + '&' + this.fecha1 + '&' + this.fecha2;
  this.router.navigate(['tray-date-range-user/', this.RutxFecha], {relativeTo: this.actRoute});}


}
getType(tipo:any){
  const tipoBandeja = tipo;
  if(tipoBandeja === null || tipoBandeja===0)
  {
      this.error = 'debe seleleccionar tipo!';
    
  }
  this.router.navigate(['trays/type/', tipoBandeja], {relativeTo: this.actRoute});
}
}



  /*// Cargar bandejas
  LoadTray() {
    return this.trayApi.getTray()
    .subscribe( data => {
          this.tray = data;
          this.displayedColumns = ['detalles', 'codigoqr', 'fechaIngreso', 'ubicacion'];
          this.dataSource = new MatTableDataSource<Tray>(data);
          this.dataSource.paginator = this.paginator;


    });
  }*/