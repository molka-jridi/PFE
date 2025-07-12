import { TestBed } from '@angular/core/testing';

import { CreditService } from './credit.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('CreditService', () => {
  let service: CreditService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]

    });
    service = TestBed.inject(CreditService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
