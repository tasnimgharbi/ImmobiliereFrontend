import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HouseFilterComponent } from './house-filter.component';

describe('HouseFilterComponent', () => {
  let component: HouseFilterComponent;
  let fixture: ComponentFixture<HouseFilterComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HouseFilterComponent]
    });
    fixture = TestBed.createComponent(HouseFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
