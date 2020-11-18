import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SpecialOfferByCategoryComponent } from './special-offer-by-category.component';

describe('SpecialOfferByCategoryComponent', () => {
  let component: SpecialOfferByCategoryComponent;
  let fixture: ComponentFixture<SpecialOfferByCategoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SpecialOfferByCategoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SpecialOfferByCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
