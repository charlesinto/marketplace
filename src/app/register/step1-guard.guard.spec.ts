import { TestBed } from '@angular/core/testing';

import { Step1GuardGuard } from './step1-guard.guard';

describe('Step1GuardGuard', () => {
  let guard: Step1GuardGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(Step1GuardGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
