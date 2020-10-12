import { TestBed } from '@angular/core/testing';

import { BdConnectionPieService } from './bd-connection-pie.service';

describe('BdConnectionPieService', () => {
  let service: BdConnectionPieService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BdConnectionPieService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
