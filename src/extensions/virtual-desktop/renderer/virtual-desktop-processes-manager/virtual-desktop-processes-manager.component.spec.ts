/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { VirtualDesktopProcessesManagerComponent } from './virtual-desktop-processes-manager.component';

describe('VirtualDesktopProcessesManagerComponent', () => {
  let component: VirtualDesktopProcessesManagerComponent;
  let fixture: ComponentFixture<VirtualDesktopProcessesManagerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VirtualDesktopProcessesManagerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VirtualDesktopProcessesManagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
