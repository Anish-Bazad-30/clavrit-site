import { TestBed } from '@angular/core/testing';

import { BusinessStatsService } from './business-stats.service';

describe('BusinessStatsService', () => {
  let service: BusinessStatsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BusinessStatsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
