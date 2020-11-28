import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewDisputeComponent } from './new-dispute.component';

describe('NewDisputeComponent', () => {
  let component: NewDisputeComponent;
  let fixture: ComponentFixture<NewDisputeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewDisputeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewDisputeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
