import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'

import { SharedModule } from 'app/shared/shared.module'

import { WindowPresetsRoutingModule } from './window-presets-router.module'

import { WindowPresetsComponent } from './window-presets/window-presets.component'


@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    WindowPresetsRoutingModule
  ],
  declarations: [WindowPresetsComponent]
})
export class WindowPresetsModule { }
