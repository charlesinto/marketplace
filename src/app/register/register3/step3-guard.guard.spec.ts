import { TestBed } from '@angular/core/testing';

import { Step3GuardGuard } from './step3-guard.guard';

describe('Step3GuardGuard', () => {
  let guard: Step3GuardGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(Step3GuardGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
