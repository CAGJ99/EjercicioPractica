import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateUbicationsComponent } from './create-ubications.component';

describe('CreateUbicationsComponent', () => {
  let component: CreateUbicationsComponent;
  let fixture: ComponentFixture<CreateUbicationsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateUbicationsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateUbicationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
