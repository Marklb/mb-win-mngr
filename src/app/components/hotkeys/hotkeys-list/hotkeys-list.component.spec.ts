/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { HotkeysListComponent } from './hotkeys-list.component';

describe('HotkeysListComponent', () => {
  let component: HotkeysListComponent;
  let fixture: ComponentFixture<HotkeysListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HotkeysListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HotkeysListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
