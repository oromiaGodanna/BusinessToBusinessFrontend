import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OpenedProformaComponent } from './opened-proforma.component';

describe('OpenedProformaComponent', () => {
  let component: OpenedProformaComponent;
  let fixture: ComponentFixture<OpenedProformaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OpenedProformaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OpenedProformaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
