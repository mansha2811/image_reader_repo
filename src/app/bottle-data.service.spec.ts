import { TestBed } from '@angular/core/testing';

import { BottleDataService } from './bottle-data.service';

describe('BottleDataService', () => {
  let service: BottleDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BottleDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
