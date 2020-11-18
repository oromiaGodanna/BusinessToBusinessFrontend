import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PendingProformaComponent } from './pending-proforma.component';

describe('PendingProformaComponent', () => {
  let component: PendingProformaComponent;
  let fixture: ComponentFixture<PendingProformaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PendingProformaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PendingProformaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
