import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ActiveSpecialOfferComponent } from './active-special-offer.component';

describe('ActiveSpecialOfferComponent', () => {
  let component: ActiveSpecialOfferComponent;
  let fixture: ComponentFixture<ActiveSpecialOfferComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ActiveSpecialOfferComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ActiveSpecialOfferComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
