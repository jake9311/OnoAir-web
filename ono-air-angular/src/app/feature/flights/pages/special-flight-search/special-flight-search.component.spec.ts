import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpecialFlightSearchComponent } from './special-flight-search.component';

describe('SpecialFlightSearchComponent', () => {
  let component: SpecialFlightSearchComponent;
  let fixture: ComponentFixture<SpecialFlightSearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SpecialFlightSearchComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SpecialFlightSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
