import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TrayServices } from '../../../_Services/tray.service';
import { MatPaginator, MatTableDataSource } from '@angular/material';
import { Tray } from 'src/app/models/tray';

@Component({
  selector: 'app-search-tray-user',
  templateUrl: './search-tray-user.component.html'
})
export class SearchTrayUserComponent implements OnInit {
error;
TrayXUser:any = []; 
displayedColumns: string[] = [];
dataSource: any = [];
usuario:any;
  // paginator
  length = 100;
  pageSize = 5;
@ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;
  total: number;
  constructor(private actRoute:ActivatedRoute, private ApiService:TrayServices , private enrutador: Router) { }

  ngOnInit() {

    this.actRoute.params.subscribe(params => {
      const termino: string = (params['rut']);
      this.displayedColumns = ['detalles', 'codigoqr', 'fechaIngreso'];
      this.getByUser(termino);
    });
  }


  getByUser(rut: string) {
    this.ApiService.getByUser(rut).subscribe(datos => {
      // console.log(datos);
      this.TrayXUser = datos;
      if(this.TrayXUser.success ===false)
      {
        this.error = 'Usuario ingresado no existe!!';
      }
     else{
      this.dataSource = new MatTableDataSource<any>(this.TrayXUser.bandejas);
      this.dataSource.paginator = this.paginator;
      const nombre = this.TrayXUser.bandejas[0].usuario.nombre;
      const appat = this.TrayXUser.bandejas[0].usuario.apPat;
      const apmat = this.TrayXUser.bandejas[0].usuario.apMat;
      this.usuario = nombre + ' ' + appat + ' ' + apmat;
      this.error='';
      const total = this.TrayXUser.bandejas;
      if (!total) {
       this.total = 0;
     } else {
     const index = this.getAllIndexes(total);
     this.total = index.length;
    }
     }},error=>{
       this.error=error;
     });
    
  }

verBandejas(idx) {
  this.enrutador.navigate(['/tray', idx]);
 }
 
 getAllIndexes(arr) {
  let indexes = [], i: number;
  for (i = 0; i < arr.length; i++) {
        indexes.push(i);
}
  return indexes;
}
}
