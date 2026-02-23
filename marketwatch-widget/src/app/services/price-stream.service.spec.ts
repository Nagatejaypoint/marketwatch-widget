import { TestBed } from '@angular/core/testing';

import { PriceStreamService } from './price-stream.service';

describe('PriceStreamService', () => {
  let service: PriceStreamService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PriceStreamService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
