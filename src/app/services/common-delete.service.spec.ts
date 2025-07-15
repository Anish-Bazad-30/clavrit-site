import { TestBed } from '@angular/core/testing';

import { CommonDeleteService } from './common-delete.service';

describe('CommonDeleteService', () => {
  let service: CommonDeleteService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CommonDeleteService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
