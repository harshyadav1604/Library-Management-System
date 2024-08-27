import { TestBed } from '@angular/core/testing';

import { BookCountService } from './book-count.service';

describe('BookCountService', () => {
  let service: BookCountService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BookCountService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
