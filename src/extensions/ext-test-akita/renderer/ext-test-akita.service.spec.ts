import { TestBed } from '@angular/core/testing';

import { ExtTestAkitaService } from './ext-test-akita.service';

describe('ExtTestAkitaService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ExtTestAkitaService = TestBed.get(ExtTestAkitaService);
    expect(service).toBeTruthy();
  });
});
