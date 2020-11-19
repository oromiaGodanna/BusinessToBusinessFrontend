import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SpecialOfferBySubCategoryComponent } from './special-offer-by-sub-category.component';

describe('SpecialOfferBySubCategoryComponent', () => {
  let component: SpecialOfferBySubCategoryComponent;
  let fixture: ComponentFixture<SpecialOfferBySubCategoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SpecialOfferBySubCategoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SpecialOfferBySubCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
