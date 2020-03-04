import { Component, OnInit, ViewChild } from '@angular/core';
import { TrayServices } from '../../../_Services/tray.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatTableDataSource, MatPaginator } from '@angular/material';
import { Tray } from '../../../models/tray';

@Component({
  selector: 'app-search-date-range',
  templateUrl: './search-date-range.component.html'
})
export class SearchDateRangeComponent implements OnInit {
  Trayxdaterange: any = [];
  error;
  total: number;
  // datetable
  displayedColumns: string[] = [];
  dataSource: any = [];
  // paginator
  length = 100;
  pageSize = 5;
  

  constructor(private TrayApi: TrayServices, private actRoute: ActivatedRoute, private enrutador: Router) { }
  @ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;

  ngOnInit() {
    this.actRoute.params.subscribe(params => {
      const termino: string = (params.term);
      this.displayedColumns = ['detalles', 'codigoqr', 'fechaIngreso'];
      this.searchByDateRange(termino);
    });

  }
  searchByDateRange(term:string) {
   this.TrayApi.getByDateRange(term)
   .subscribe(data => {
     const datos  = data;
     this.Trayxdaterange = datos.bandejaDB;
     this.dataSource = new MatTableDataSource(this.Trayxdaterange);
     this.dataSource.paginator = this.paginator;
     this.error = datos.message;
     const total = this.Trayxdaterange;
     if (!total) {
       this.total = 0;
     } else {
     const index = this.getAllIndexes(total);
     this.total = index.length;
    }
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
