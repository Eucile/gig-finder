import { TestBed, inject } from '@angular/core/testing';

import { ConcertService } from './concert.service';

describe('ConcertService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ConcertService]
    });
  });

  it('should be created', inject([ConcertService], (service: ConcertService) => {
    expect(service).toBeTruthy();
  }));
});
