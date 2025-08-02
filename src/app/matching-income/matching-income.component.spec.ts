import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MatchingIncomeComponent } from './matching-income.component';

describe('MatchingIncomeComponent', () => {
  let component: MatchingIncomeComponent;
  let fixture: ComponentFixture<MatchingIncomeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MatchingIncomeComponent]
    });
    fixture = TestBed.createComponent(MatchingIncomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
