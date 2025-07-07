import { TestBed } from '@angular/core/testing';

import { FaitMigrationService } from './fait-migration.service';

describe('FaitMigrationService', () => {
  let service: FaitMigrationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FaitMigrationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
