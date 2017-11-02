import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProcessesListComponent } from './processes-list.component';

describe('ProcessesListComponent', () => {
  let component: ProcessesListComponent;
  let fixture: ComponentFixture<ProcessesListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProcessesListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProcessesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
