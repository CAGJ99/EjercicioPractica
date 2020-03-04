import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UbicationListComponent } from './ubication-list.component';

describe('UbicationListComponent', () => {
  let component: UbicationListComponent;
  let fixture: ComponentFixture<UbicationListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UbicationListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UbicationListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
