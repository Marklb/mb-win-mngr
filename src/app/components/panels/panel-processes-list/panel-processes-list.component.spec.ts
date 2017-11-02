import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PanelProcessesListComponent } from './panel-processes-list.component';

describe('PanelProcessesListComponent', () => {
  let component: PanelProcessesListComponent;
  let fixture: ComponentFixture<PanelProcessesListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PanelProcessesListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PanelProcessesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
