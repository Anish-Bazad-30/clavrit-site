import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CareerDetailComponent } from './career-detail.component';

describe('CareerDetailComponent', () => {
  let component: CareerDetailComponent;
  let fixture: ComponentFixture<CareerDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CareerDetailComponent]
    });
    fixture = TestBed.createComponent(CareerDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
