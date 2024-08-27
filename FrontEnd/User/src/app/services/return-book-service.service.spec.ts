import { TestBed } from '@angular/core/testing';

import { ReturnBookServiceService } from './return-book-service.service';

describe('ReturnBookServiceService', () => {
  let service: ReturnBookServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ReturnBookServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
