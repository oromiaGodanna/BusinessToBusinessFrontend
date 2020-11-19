import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RequestProformaComponent } from './request-proforma.component';

describe('RequestProformaComponent', () => {
  let component: RequestProformaComponent;
  let fixture: ComponentFixture<RequestProformaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RequestProformaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RequestProformaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
