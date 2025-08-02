import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeamRightComponent } from './team-right.component';

describe('TeamRightComponent', () => {
  let component: TeamRightComponent;
  let fixture: ComponentFixture<TeamRightComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TeamRightComponent]
    });
    fixture = TestBed.createComponent(TeamRightComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
