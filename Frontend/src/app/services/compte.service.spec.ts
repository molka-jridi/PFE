import { TestBed } from '@angular/core/testing';

import { CompteService } from './compte.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('CompteService', () => {
  let service: CompteService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]

    });
    service = TestBed.inject(CompteService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
