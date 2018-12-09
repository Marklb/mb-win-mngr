/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing'
import { By } from '@angular/platform-browser'
import { DebugElement } from '@angular/core'

import { WindowPresetsComponent } from './window-presets.component'

describe('WindowPresetsComponent', () => {
  let component: WindowPresetsComponent
  let fixture: ComponentFixture<WindowPresetsComponent>

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WindowPresetsComponent ]
    })
    .compileComponents()
  }))

  beforeEach(() => {
    fixture = TestBed.createComponent(WindowPresetsComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
