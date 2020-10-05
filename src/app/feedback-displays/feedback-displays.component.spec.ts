import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FeedbackDisplaysComponent } from './feedback-displays.component';

describe('FeedbackDisplaysComponent', () => {
  let component: FeedbackDisplaysComponent;
  let fixture: ComponentFixture<FeedbackDisplaysComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FeedbackDisplaysComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FeedbackDisplaysComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
