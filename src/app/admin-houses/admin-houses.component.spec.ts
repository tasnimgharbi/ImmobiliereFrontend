import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminHousesComponent } from './admin-houses.component';

describe('AdminHousesComponent', () => {
  let component: AdminHousesComponent;
  let fixture: ComponentFixture<AdminHousesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdminHousesComponent]
    });
    fixture = TestBed.createComponent(AdminHousesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
