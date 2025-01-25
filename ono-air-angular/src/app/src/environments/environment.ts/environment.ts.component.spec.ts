import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EnvironmentTsComponent } from './environment.ts.component';

describe('EnvironmentTsComponent', () => {
  let component: EnvironmentTsComponent;
  let fixture: ComponentFixture<EnvironmentTsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EnvironmentTsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EnvironmentTsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
