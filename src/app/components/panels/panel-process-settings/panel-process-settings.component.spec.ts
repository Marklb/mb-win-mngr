import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PanelProcessSettingsComponent } from './panel-process-settings.component';

describe('PanelProcessSettingsComponent', () => {
  let component: PanelProcessSettingsComponent;
  let fixture: ComponentFixture<PanelProcessSettingsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PanelProcessSettingsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PanelProcessSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
