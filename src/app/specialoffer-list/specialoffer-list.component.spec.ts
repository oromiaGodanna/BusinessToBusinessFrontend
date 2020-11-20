import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SpecialofferListComponent } from './specialoffer-list.component';

describe('SpecialofferListComponent', () => {
  let component: SpecialofferListComponent;
  let fixture: ComponentFixture<SpecialofferListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SpecialofferListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SpecialofferListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
