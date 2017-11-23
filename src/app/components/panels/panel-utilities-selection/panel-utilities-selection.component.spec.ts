import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PanelUtilitiesSelectionComponent } from './panel-utilities-selection.component';

describe('PanelUtilitiesSelectionComponent', () => {
  let component: PanelUtilitiesSelectionComponent;
  let fixture: ComponentFixture<PanelUtilitiesSelectionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PanelUtilitiesSelectionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PanelUtilitiesSelectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
