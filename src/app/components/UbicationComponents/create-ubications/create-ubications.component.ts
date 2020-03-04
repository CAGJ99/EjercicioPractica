import { Component, OnInit } from '@angular/core';
import { UbicationService } from '../../../_Services/ubication.service';
import { Route, Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-create-ubications',
  templateUrl: './create-ubications.component.html',
  styleUrls: ['./create-ubications.component.css']
})
export class CreateUbicationsComponent implements OnInit {
  registerType: FormGroup;
  message: any;
  loading: any;
  submitted = false;
  AllTypes: any;
  res: any;
  idUbication: any;
  error;
  constructor(private formBuilder: FormBuilder,
              private ApiService: UbicationService,
              private router: Router,
              private actRoute: ActivatedRoute) { }

  ngOnInit() {
    this.actRoute.params.subscribe(params => {
      this.idUbication = params.id;
    });
    this.registerType = this.formBuilder.group({
      lugar: ['',  Validators.required]
      });
  }
  get f() {return this.registerType.controls; }

  onSubmit() {
    this.submitted = true;
    if (this.registerType.invalid) {
    // console.log(this.registerForm);
    return;
  }

    this.ApiService.createUbications(this.registerType.value)
    .subscribe(data => {
      this.res = data;
      if (this.res.success === true) {
        this.message = 'Ubicacion registrada con exito';
        this.registerType.reset();
        setTimeout(() => {
          this.message ='';
        }, 900);
      }

    });
  }

  updateUser() {
    const formulario = this.registerType.value;
   // console.log(this.UpdateForm.value);
   // this.userEdited = formulario;
    this.ApiService.updateUbication(this.idUbication, formulario)
     .subscribe(data => {
      // console.log(data);
       this.res = data;
       this.message = this.res.message;
     }, error => {
       this.message = '';
       this.error = error;
     });
 }
}
