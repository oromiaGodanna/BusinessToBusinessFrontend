import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewProformaComponent } from './view-proforma.component';

describe('ViewProformaComponent', () => {
  let component: ViewProformaComponent;
  let fixture: ComponentFixture<ViewProformaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewProformaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewProformaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
