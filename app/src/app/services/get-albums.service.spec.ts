import { TestBed } from '@angular/core/testing';

import { GetAlbumsService } from './get-albums.service';

describe('GetAlbumsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GetAlbumsService = TestBed.get(GetAlbumsService);
    expect(service).toBeTruthy();
  });
});
