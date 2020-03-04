import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchTypeTrayComponent } from './search-type-tray.component';

describe('SearchTypeTrayComponent', () => {
  let component: SearchTypeTrayComponent;
  let fixture: ComponentFixture<SearchTypeTrayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchTypeTrayComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchTypeTrayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
