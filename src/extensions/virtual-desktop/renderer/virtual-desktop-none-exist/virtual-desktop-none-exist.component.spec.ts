/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { VirtualDesktopNoneExistComponent } from './virtual-desktop-none-exist.component';

describe('VirtualDesktopNoneExistComponent', () => {
  let component: VirtualDesktopNoneExistComponent;
  let fixture: ComponentFixture<VirtualDesktopNoneExistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VirtualDesktopNoneExistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VirtualDesktopNoneExistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
