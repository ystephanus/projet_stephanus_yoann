import { TestBed } from '@angular/core/testing';

import { GardtestGuard } from './gardtest.guard';

describe('GardtestGuard', () => {
  let guard: GardtestGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(GardtestGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
