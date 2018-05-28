/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { VirtualDesktopSwitcherBarComponent } from './virtual-desktop-switcher-bar.component';

describe('VirtualDesktopSwitcherBarComponent', () => {
  let component: VirtualDesktopSwitcherBarComponent;
  let fixture: ComponentFixture<VirtualDesktopSwitcherBarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VirtualDesktopSwitcherBarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VirtualDesktopSwitcherBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
