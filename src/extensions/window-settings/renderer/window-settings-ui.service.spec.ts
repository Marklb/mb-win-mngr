/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { WindowSettingsUiService } from './window-settings-ui.service';

describe('Service: WindowSettingsUi', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [WindowSettingsUiService]
    });
  });

  it('should ...', inject([WindowSettingsUiService], (service: WindowSettingsUiService) => {
    expect(service).toBeTruthy();
  }));
});
