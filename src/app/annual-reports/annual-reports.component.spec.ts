import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AnnualReportsComponent } from './annual-reports.component';

describe('AnnualReportsComponent', () => {
  let component: AnnualReportsComponent;
  let fixture: ComponentFixture<AnnualReportsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AnnualReportsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AnnualReportsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
