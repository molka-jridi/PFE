import { TestBed } from '@angular/core/testing';

import { AnalystGuard } from './analyst.guard';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('AnalystGuard', () => {
  let guard: AnalystGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]

    });
    guard = TestBed.inject(AnalystGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
