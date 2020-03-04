import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TrayServices } from '../../../_Services/tray.service';
import { MatPaginator, MatTableDataSource } from '@angular/material';
import { Tray } from 'src/app/models/tray';

@Component({
  selector: 'app-tray-date-range-user',
  templateUrl: './tray-date-range-user.component.html'
})
export class TrayDateRangeUserComponent implements OnInit {
  TrayXDateXUser: any;
  displayedColumns: string[] = [];
  dataSource: any = [];
  error;
  // paginator
  length = 100;
  pageSize = 5;
  @ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;
  total: number;
  res: any;
  usuario: string;
  constructor(private actRoute: ActivatedRoute, private TrayApi: TrayServices, private enrutador: Router) { }

  ngOnInit() {
    this.actRoute.params.subscribe(params => {
      const termino: string = (params.termino);
      this.displayedColumns = ['detalles', 'codigoqr', 'fechaIngreso'];
      this.searchByUserAndDateRange(termino);
    });

  }
  searchByUserAndDateRange(term) {
    this.TrayApi.getByDateRangeAndUser(term).subscribe(datos => {
     const data = datos;
     this.res = datos;
     if(this.res.success === false)
     {
       this.error = this.res.message;
     }
     else {
     this.TrayXDateXUser = data.bandejas;
     const nombre = this.TrayXDateXUser[0].usuario.nombre;
     const appat = this.TrayXDateXUser[0].usuario.apPat;
     const apmat = this.TrayXDateXUser[0].usuario.apMat;
     this.usuario = nombre + ' ' + appat + ' ' + apmat;
     this.dataSource = new MatTableDataSource(this.TrayXDateXUser);
     this.dataSource.paginator = this.paginator;
     this.error = '';
     const total = this.TrayXDateXUser;
     if (!total) {
         this.total = 0;
        } else {
     const index = this.getAllIndexes(total);
     this.total = index.length;
}
}},error=>{
   this.error = error;
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
