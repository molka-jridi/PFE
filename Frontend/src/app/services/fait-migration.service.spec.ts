import { TestBed } from '@angular/core/testing';

import { FaitMigrationService } from './fait-migration.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('FaitMigrationService', () => {
  let service: FaitMigrationService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]

    });
    service = TestBed.inject(FaitMigrationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
