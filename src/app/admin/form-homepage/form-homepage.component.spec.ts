import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormHomepageComponent } from './form-homepage.component';

describe('FormHomepageComponent', () => {
  let component: FormHomepageComponent;
  let fixture: ComponentFixture<FormHomepageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormHomepageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormHomepageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
