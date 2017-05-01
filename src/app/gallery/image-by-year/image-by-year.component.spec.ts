import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ImageByYearComponent } from './image-by-year.component';

describe('ImageByYearComponent', () => {
  let component: ImageByYearComponent;
  let fixture: ComponentFixture<ImageByYearComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ImageByYearComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ImageByYearComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
