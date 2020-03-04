import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchDateRangeComponent } from './search-date-range.component';

describe('SearchDateRangeComponent', () => {
  let component: SearchDateRangeComponent;
  let fixture: ComponentFixture<SearchDateRangeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchDateRangeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchDateRangeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
