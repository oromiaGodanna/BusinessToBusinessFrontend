import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SubscriptionModelsComponent } from './subscription-models.component';

describe('SubscriptionModelsComponent', () => {
  let component: SubscriptionModelsComponent;
  let fixture: ComponentFixture<SubscriptionModelsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SubscriptionModelsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubscriptionModelsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
