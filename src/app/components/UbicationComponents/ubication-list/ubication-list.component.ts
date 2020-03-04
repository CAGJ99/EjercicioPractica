import { Component, OnInit, ViewChild } from '@angular/core';
import { UbicationService } from '../../../_Services/ubication.service';
import { Ubication } from '../../../models/ubication';
import { MatPaginator, MatTableDataSource } from '@angular/material';
import { Router } from '@angular/router';



@Component({
  selector: 'app-ubication-list',
  templateUrl: './ubication-list.component.html',
  styleUrls: ['./ubication-list.component.css']
})
export class UbicationListComponent implements OnInit {
  AllUbications;
  displayedColumns: string[] = [];
  dataSource: any = [];
  error;
  res;
  progress;

@ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;
  constructor(private ubicationApi: UbicationService, private router: Router) { }

  ngOnInit() {
   this.getUbication();
   
  }
  getUbication() {
    this.ubicationApi.getUbications()
    .subscribe(data => {
      this.AllUbications = data;
      this.displayedColumns = ['lugar', 'acciones'];
      this.dataSource = new MatTableDataSource<Ubication>(this.AllUbications.ubicaciones);
      this.dataSource.paginator = this.paginator;
      this.error = '';
});
}

  deleteUbication(id: number) {
   this.ubicationApi.deleteUbication(id)
   .subscribe(data => {
        this.res = data;
        setTimeout(() => {
          this.progress = true;
        }, 500);
        setTimeout(() => {
        this.error = this.res.message;
        this.progress =false;
        this.ngOnInit();
       }, 2000);
   });

  }

  sendID(idx: number) {
    // console.log(lugar);
    this.router.navigate(['/edit-ubication', idx]);

   }
}
