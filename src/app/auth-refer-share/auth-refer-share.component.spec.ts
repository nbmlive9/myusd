import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthReferShareComponent } from './auth-refer-share.component';

describe('AuthReferShareComponent', () => {
  let component: AuthReferShareComponent;
  let fixture: ComponentFixture<AuthReferShareComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AuthReferShareComponent]
    });
    fixture = TestBed.createComponent(AuthReferShareComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
