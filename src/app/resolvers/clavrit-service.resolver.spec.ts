import { TestBed } from '@angular/core/testing';
import { ResolveFn } from '@angular/router';

import { clavritServiceResolver } from './clavrit-service.resolver';

describe('clavritServiceResolver', () => {
  const executeResolver: ResolveFn<boolean> = (...resolverParameters) => 
      TestBed.runInInjectionContext(() => clavritServiceResolver(...resolverParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeResolver).toBeTruthy();
  });
});
