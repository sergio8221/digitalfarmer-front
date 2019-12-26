import { TestBed } from '@angular/core/testing';

import { MachineryService } from './machinery.service';

describe('MachineryService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MachineryService = TestBed.get(MachineryService);
    expect(service).toBeTruthy();
  });
});
