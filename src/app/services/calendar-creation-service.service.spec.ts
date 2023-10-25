import { TestBed } from '@angular/core/testing';

import { CalendarCreationServiceService } from './calendar-creation-service.service';

describe('CalendarCreationServiceService', () => {
  let service: CalendarCreationServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CalendarCreationServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
