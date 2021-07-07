import { TestBed } from '@angular/core/testing';

import { BackbuttonhandalService } from './backbuttonhandal.service';

describe('BackbuttonhandalService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: BackbuttonhandalService = TestBed.get(BackbuttonhandalService);
    expect(service).toBeTruthy();
  });
});
