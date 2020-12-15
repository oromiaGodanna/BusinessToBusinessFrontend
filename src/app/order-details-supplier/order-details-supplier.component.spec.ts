import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderDetailsSupplierComponent } from './order-details-supplier.component';

describe('OrderDetailsSupplierComponent', () => {
  let component: OrderDetailsSupplierComponent;
  let fixture: ComponentFixture<OrderDetailsSupplierComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrderDetailsSupplierComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderDetailsSupplierComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
