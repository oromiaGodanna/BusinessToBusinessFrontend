import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PendingSpecialOfferComponent } from './pending-special-offer.component';

describe('PendingSpecialOfferComponent', () => {
  let component: PendingSpecialOfferComponent;
  let fixture: ComponentFixture<PendingSpecialOfferComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PendingSpecialOfferComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PendingSpecialOfferComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
