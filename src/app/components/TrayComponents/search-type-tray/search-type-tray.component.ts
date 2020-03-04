import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatPaginator } from '@angular/material';
import { TrayServices } from 'src/app/_Services/tray.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-search-type-tray',
  templateUrl: './search-type-tray.component.html',
  styleUrls: ['./search-type-tray.component.css']
})
export class SearchTypeTrayComponent implements OnInit {
  displayedColumns: string[] = [];
  dataSource: any = [];
  error;
  total: number;
  TrayxType: any;
  Tipo:any
   // paginator
  length = 100;
  pageSize = 5;
  constructor(private TrayApi: TrayServices, private actRoute: ActivatedRoute, private enrutador: Router) { }
  @ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;

  ngOnInit() {
    this.actRoute.params.subscribe(params => {
      this.Tipo = (params.tipo);
      this.displayedColumns = ['detalles', 'codigoqr', 'fechaIngreso'];
      this.searchByType(this.Tipo);
    });

  }
  searchByType(term:string) {
   this.TrayApi.getType(term)
   .subscribe(data => {
     // console.log(data);
     const datos  = data;
     this.TrayxType = datos;
     this.dataSource = new MatTableDataSource(this.TrayxType.bandejas);
     this.dataSource.paginator = this.paginator;
     const total = this.TrayxType;
     if (!total) {
       this.total = 0;
     } else {
     const index = this.getAllIndexes(total);
     this.total = index.length;
    }
  },error =>{
    this.error = error.message;
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
