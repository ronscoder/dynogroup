import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BankersAuditorsComponent } from './bankers-auditors.component';

describe('BankersAuditorsComponent', () => {
  let component: BankersAuditorsComponent;
  let fixture: ComponentFixture<BankersAuditorsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BankersAuditorsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BankersAuditorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
