/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing'
import { By } from '@angular/platform-browser'
import { DebugElement } from '@angular/core'

import { ExtTestAkitaComponent } from './ext-test-akita.component'

describe('ExtTestAkitaComponent', () => {
  let component: ExtTestAkitaComponent
  let fixture: ComponentFixture<ExtTestAkitaComponent>

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExtTestAkitaComponent ]
    })
    .compileComponents()
  }))

  beforeEach(() => {
    fixture = TestBed.createComponent(ExtTestAkitaComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
