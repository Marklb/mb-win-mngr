/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { VirtualDesktopService } from './virtual-desktop.service';

describe('Service: VirtualDesktop', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [VirtualDesktopService]
    });
  });

  it('should ...', inject([VirtualDesktopService], (service: VirtualDesktopService) => {
    expect(service).toBeTruthy();
  }));
});
