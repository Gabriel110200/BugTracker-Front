import { TestBed } from '@angular/core/testing';

import { ImpedimentService } from './impediment.service';

describe('ImpedimentService', () => {
  let service: ImpedimentService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ImpedimentService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
