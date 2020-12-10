import { TestBed } from '@angular/core/testing';

import { DashboardProfileGuard } from './dashboard-profile.guard';

describe('DashboardProfileGuard', () => {
  let guard: DashboardProfileGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(DashboardProfileGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
