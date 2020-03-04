import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/_Services/user.service';
import { TrayServices } from '../../../_Services/tray.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { User } from '../../../models/user';
import { UbicationService } from '../../../_Services/ubication.service';

@Component({
  selector: 'app-update-users',
  templateUrl: './update-users.component.html',
  styleUrls: ['./update-users.component.css']
})
export class UpdateUsersComponent implements OnInit {
UpdateForm: FormGroup;
Ubicaciones: any;
UserXRut: any;
Rut: any;
user: User;
error: any;
id: any;
userEdited: any;
submitted = false;
message = '';
res: any;
  constructor(private actRoute: ActivatedRoute,
              private UserApi: UserService,
              private router: Router,
              private UbicationApi: UbicationService,

              private formBuilder: FormBuilder, ) {}

  ngOnInit() {
    // formulario
   // obtener rut
    this.actRoute.params.subscribe(params => {
      this.Rut = (params.id);
     // console.log(this.Rut);
      this.searchUser(this.Rut);
  });

// obtener ubicaciones
    this.UbicationApi.getUbications2()
.subscribe(res => {
  const sucursal = Object.values(res);
  this.Ubicaciones = sucursal[1];
});
    this.UpdateForm = this.formBuilder.group({
      ubicacion: ['', Validators.required],
      nombre:   ['', Validators.required],
      apPat:    ['', Validators.required],
      apMat:    ['', Validators.required],
      rut:      ['', Validators.required],
      telefono:  ['', [Validators.required, Validators.minLength(6)]],
        });
  }


  get f() {return this.UpdateForm.controls; }

  searchUser(rut) {
    return this.UserApi.getUserByRut(rut)
    .subscribe((data: {}) => {
      this.UserXRut = data;
      this.user = this.UserXRut.usuarioEncontrado;
      this.id = this.user[0]._id;

    });
  }

  updateUser() {
     const formulario = this.UpdateForm.value;
    // console.log(this.UpdateForm.value);
     this.UserApi.updateUser(this.id, formulario)
      .subscribe(data => {
        this.res = data;
        this.message = this.res.message;
      }, error => {
        this.message = '';
        this.error = error;
      });
  }
}
