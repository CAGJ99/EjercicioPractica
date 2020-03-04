import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../../../_Services/user.service';
import { MatTableDataSource } from '@angular/material';

@Component({
  selector: 'app-search-name',
  templateUrl: './search-name.component.html'
})
export class SearchNameComponent implements OnInit {
  displayedColumns: string[] = [];
  dataSource: any = [];
  UserXName;
  error: any;
  updateId: any;
  userDelete: any;
  hecho: any;
  progress: boolean;
  constructor(private actRoute:ActivatedRoute, private UserApi:UserService, private router: Router) { }

  ngOnInit() {

    this.actRoute.params
    .subscribe(params => {
      const FullName = params.name;
      this.getUser(FullName);
    });
  }

  getUser(fullname: string) {
    this.UserApi.getUserByName(fullname)
    .subscribe(data => {
      // console.log(data);
      this.UserXName = data;
      this.displayedColumns = ['rut', 'nombre', 'apellidos', 'acciones'];
      this.dataSource = new MatTableDataSource<any>(this.UserXName.usuarioEncontrado);
      this.error = this.UserXName.message;
    }, error => {
      this.error = error;
  });

  }

  sendID(id: string) {
    this.updateId = id;
    // console.log(id);
    this.router.navigate(['update-user/', this.updateId]);
  }

  deleteUser(id: number) {
      if(window.confirm('estas seguro de eliminar?')) {
      this.UserApi.deleteUser(id).subscribe(data => {
      this.userDelete = data;
      
      this.userDelete = data;
      setTimeout(() => {
        this.progress = true;
      }, 500);
      setTimeout(() => {
     this.hecho = this.userDelete.message;
     this.progress = false;

     }, 2000);
      setTimeout(() => {
      this.router.navigate(['get-users/']);
     }, 3000);

      // console.log(data);
    });
   }
  }

}
