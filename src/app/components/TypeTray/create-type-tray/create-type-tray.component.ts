import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { TypeTrayService } from '../../../_Services/TypeTray.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-create-type-tray',
  templateUrl: './create-type-tray.component.html'
})
export class CreateTypeTrayComponent implements OnInit {
registerType: FormGroup;
message: any;
loading: any;
submitted = false;
AllTypes: any;
res:any;
  error: any;

  constructor(private formBuilder: FormBuilder, private ApiService: TypeTrayService, private router: Router) { }

  ngOnInit() {
    this.registerType = this.formBuilder.group({
      tipo: ['', [ Validators.required, Validators.maxLength(1)]],
      descripcion: ['', Validators.required],
      });
  }

  get f() {return this.registerType.controls; }

  onSubmit() {
    this.submitted = true;
    if (this.registerType.invalid) {
      return;
    }
    this.ApiService.createDetails(this.registerType.value)
    .subscribe(data => {
      console.log(data);
      this.res = data;
      if(this.res.success===true)
      {
        this.message = 'bandeja guardada con exito';
        this.registerType.reset();
        setTimeout(() => {
          this.message ='';
        }, 900);
      }
      else
      {
        this.error = this.res.message;
      }
    });
  }
}
