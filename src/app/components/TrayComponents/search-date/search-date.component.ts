import { Component, OnInit, ViewChild } from '@angular/core';
import { TrayServices } from '../../../_Services/tray.service';
import {ActivatedRoute} from '@angular/router';
import { MatTableDataSource} from '@angular/material';
import {MatPaginator } from '@angular/material/paginator';
import { Tray } from '../../../models/tray';
import {Router} from '@angular/router';


@Component({
  selector: 'app-search-date',
  templateUrl: './search-date.component.html',
  styleUrls: ['./search-date.component.css']
})
export class SearchDateComponent implements OnInit {
  Trayxdate: any = [];
  displayedColumns: string[] = [];
  dataSource: any = [];
  error;
  success;
  total:any;
  // paginator
  length = 100;
  pageSize = 5;

constructor(
    private trayApi: TrayServices,
    private actRoute: ActivatedRoute,
    private enrutador: Router
    ) { }
  @ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;
  ngOnInit() {

    this.actRoute.params
      .subscribe(params => {
      const termino: string = (params.term);
      this.displayedColumns = ['detalles', 'codigoqr', 'fechaIngreso'];
      this.searchByDate(termino);
    });

  }


searchByDate(term: string ) {

    this.trayApi.SearchDate(term)
    .subscribe(data => {
       const datos = data;
       this.Trayxdate = datos.bandejaDB;
       this.dataSource = new MatTableDataSource(this.Trayxdate);
       this.dataSource.paginator = this.paginator;
       this.error = datos.message;
       const total = this.Trayxdate;
       if(!total) {
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
