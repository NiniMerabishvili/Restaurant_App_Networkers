import { TestBed } from '@angular/core/testing';

import { BookedTablesService } from './booked-tables.service';

describe('BookedTablesService', () => {
  let service: BookedTablesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BookedTablesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
