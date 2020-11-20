import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClosedProformaComponent } from './closed-proforma.component';

describe('ClosedProformaComponent', () => {
  let component: ClosedProformaComponent;
  let fixture: ComponentFixture<ClosedProformaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClosedProformaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClosedProformaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
