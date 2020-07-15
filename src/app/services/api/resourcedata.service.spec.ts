import { TestBed } from '@angular/core/testing';

import { ResourcedataService } from './resourcedata.service';

describe('ResourcedataService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ResourcedataService = TestBed.get(ResourcedataService);
    expect(service).toBeTruthy();
  });
});
