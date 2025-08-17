import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpgradeTransferComponent } from './upgrade-transfer.component';

describe('UpgradeTransferComponent', () => {
  let component: UpgradeTransferComponent;
  let fixture: ComponentFixture<UpgradeTransferComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UpgradeTransferComponent]
    });
    fixture = TestBed.createComponent(UpgradeTransferComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
