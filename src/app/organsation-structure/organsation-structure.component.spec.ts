/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { OrgansationStructureComponent } from './organsation.component';

describe('OrgansationStructureComponent', () => {
  let component: OrgansationStructureComponent;
  let fixture: ComponentFixture<OrgansationStructureComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrgansationStructureComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrgansationStructureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
