import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RoomTemperatureComponent } from './room-temperature.component';

describe('RoomTemperatureComponent', () => {
  let component: RoomTemperatureComponent;
  let fixture: ComponentFixture<RoomTemperatureComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RoomTemperatureComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RoomTemperatureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
