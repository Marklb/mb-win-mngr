import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WindowGroupsComponent } from './window-groups.component';

describe('WindowGroupsComponent', () => {
  let component: WindowGroupsComponent;
  let fixture: ComponentFixture<WindowGroupsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WindowGroupsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WindowGroupsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
