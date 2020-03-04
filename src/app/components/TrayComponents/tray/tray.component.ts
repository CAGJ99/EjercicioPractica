import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TrayServices } from '../../../_Services/tray.service';
import { MatTableDataSource, MatPaginator } from '@angular/material';
import { Tray } from '../../../models/tray';



@Component({
  selector: 'app-tray',
  templateUrl: './tray.component.html',
  styleUrls: ['./tray.component.css']
})
export class TrayComponent implements OnInit {
    Tray: any = [];
    displayedColumns: string[] = [];
    dataSource: any = [];
    TrayNumber: any = [];
    sucursal:any;

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  constructor(private actRoute: ActivatedRoute,
              private trayApi: TrayServices) {
  }

  ngOnInit() {

  this.actRoute.params
      .subscribe(params => {
      const idex: string = (params.id );
      this.showOneTray(idex);


    });
}



    showOneTray(term: string ) {
      this.trayApi.SearchTray(term)
        .subscribe(datos=> {
        this.Tray = datos.bandejaDB;
        this.sucursal = this.Tray.ubicacion.lugar;
        this.TrayNumber = this.Tray.length;
      });
  }
}
