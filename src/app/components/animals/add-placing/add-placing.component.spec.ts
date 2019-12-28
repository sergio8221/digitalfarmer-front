import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddPlacingComponent } from './add-placing.component';

describe('AddPlacingComponent', () => {
  let component: AddPlacingComponent;
  let fixture: ComponentFixture<AddPlacingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddPlacingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddPlacingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
