import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CropEventsComponent } from './crop-events.component';

describe('CropEventsComponent', () => {
  let component: CropEventsComponent;
  let fixture: ComponentFixture<CropEventsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CropEventsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CropEventsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
