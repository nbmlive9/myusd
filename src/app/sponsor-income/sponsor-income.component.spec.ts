import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SponsorIncomeComponent } from './sponsor-income.component';

describe('SponsorIncomeComponent', () => {
  let component: SponsorIncomeComponent;
  let fixture: ComponentFixture<SponsorIncomeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SponsorIncomeComponent]
    });
    fixture = TestBed.createComponent(SponsorIncomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
