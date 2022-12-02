import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DailyDietPageComponent } from './daily-diet-page.component';

describe('DailyDietPageComponent', () => {
  let component: DailyDietPageComponent;
  let fixture: ComponentFixture<DailyDietPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DailyDietPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DailyDietPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
