import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProcessSettingsComponent } from './process-settings.component';

describe('ProcessSettingsComponent', () => {
  let component: ProcessSettingsComponent;
  let fixture: ComponentFixture<ProcessSettingsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProcessSettingsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProcessSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
