/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { NodeApiService } from './node-api.service';

describe('NodeApiService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [NodeApiService]
    });
  });

  it('should ...', inject([NodeApiService], (service: NodeApiService) => {
    expect(service).toBeTruthy();
  }));
});
