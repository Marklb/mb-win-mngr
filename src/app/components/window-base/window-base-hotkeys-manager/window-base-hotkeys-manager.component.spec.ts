/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { WindowBaseHotkeysManagerComponent } from './window-base-hotkeys-manager.component';

describe('WindowBaseHotkeysManagerComponent', () => {
  let component: WindowBaseHotkeysManagerComponent;
  let fixture: ComponentFixture<WindowBaseHotkeysManagerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WindowBaseHotkeysManagerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WindowBaseHotkeysManagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
