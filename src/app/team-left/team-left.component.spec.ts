import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeamLeftComponent } from './team-left.component';

describe('TeamLeftComponent', () => {
  let component: TeamLeftComponent;
  let fixture: ComponentFixture<TeamLeftComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TeamLeftComponent]
    });
    fixture = TestBed.createComponent(TeamLeftComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
