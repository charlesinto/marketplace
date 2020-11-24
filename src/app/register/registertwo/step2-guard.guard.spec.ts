import { TestBed } from '@angular/core/testing';

import { Step2GuardGuard } from './step2-guard.guard';

describe('Step2GuardGuard', () => {
  let guard: Step2GuardGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(Step2GuardGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
