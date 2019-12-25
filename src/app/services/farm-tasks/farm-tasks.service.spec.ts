import { TestBed } from '@angular/core/testing';

import { FarmTasksService } from './farm-tasks.service';

describe('FarmTasksService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: FarmTasksService = TestBed.get(FarmTasksService);
    expect(service).toBeTruthy();
  });
});
