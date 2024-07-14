import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarControlComponent } from './car-control.component';

describe('CarControlComponent', () => {
  let component: CarControlComponent;
  let fixture: ComponentFixture<CarControlComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CarControlComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CarControlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
