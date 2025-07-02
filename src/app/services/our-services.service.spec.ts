import { TestBed } from '@angular/core/testing';

import { OurServicesService } from './our-services.service';

describe('OurServicesService', () => {
  let service: OurServicesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OurServicesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
