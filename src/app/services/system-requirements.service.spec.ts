/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { SystemRequirementsService } from './system-requirements.service';

describe('SystemRequirementsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SystemRequirementsService]
    });
  });

  it('should ...', inject([SystemRequirementsService], (service: SystemRequirementsService) => {
    expect(service).toBeTruthy();
  }));
});
