import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SpecialOfferProductComponent } from './special-offer-product.component';

describe('SpecialOfferProductComponent', () => {
  let component: SpecialOfferProductComponent;
  let fixture: ComponentFixture<SpecialOfferProductComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SpecialOfferProductComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SpecialOfferProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
