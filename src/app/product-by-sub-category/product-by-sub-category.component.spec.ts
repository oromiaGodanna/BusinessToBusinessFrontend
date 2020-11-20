import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductBySubCategoryComponent } from './product-by-sub-category.component';

describe('ProductBySubCategoryComponent', () => {
  let component: ProductBySubCategoryComponent;
  let fixture: ComponentFixture<ProductBySubCategoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductBySubCategoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductBySubCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
