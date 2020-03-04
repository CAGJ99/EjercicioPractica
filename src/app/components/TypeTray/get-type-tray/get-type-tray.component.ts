import { Component, OnInit, ViewChild } from '@angular/core';
import { TypeTrayService } from '../../../_Services/TypeTray.service';
import { TypeTray } from 'src/app/models/typeTray';
import { MatPaginator, MatTableDataSource } from '@angular/material';

@Component({
  selector: 'app-get-type-tray',
  templateUrl: './get-type-tray.component.html'
})
export class GetTypeTrayComponent implements OnInit {
AllTypes;
displayedColumns: string[] = [];
dataSource: any = [];
error;
@ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  hecho: any;
  progress: boolean;
  constructor(private ApiService: TypeTrayService) { }

  ngOnInit() {

    this.getTypes();
  }


  getTypes() {
    this.ApiService.getTypes()
    .subscribe(data => {
      // console.log(data);
      this.AllTypes = data;
      // console.log(this.AllTypes);
      this.displayedColumns = ['tipo', 'detalles', 'acciones'];
      this.dataSource = new MatTableDataSource<TypeTray>(this.AllTypes.detalleDB);
      this.dataSource.paginator = this.paginator;
      this.error = '';
});
}

  deleteType(tipo: string) {
   this.ApiService.deleteTypes(tipo)
   .subscribe(data => {
     const MSG = data.message;
     setTimeout(() => {
      this.progress = true;
    }, 500);
    
     setTimeout(() => {
    this.error = MSG;
    this.progress = false;
    this.ngOnInit();
   }, 2000);
   });
  }
}
