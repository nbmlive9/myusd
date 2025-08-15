import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TreeRegistrationComponent } from './tree-registration.component';

describe('TreeRegistrationComponent', () => {
  let component: TreeRegistrationComponent;
  let fixture: ComponentFixture<TreeRegistrationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TreeRegistrationComponent]
    });
    fixture = TestBed.createComponent(TreeRegistrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
