import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'

import { SharedModule } from 'app/shared/shared.module'

import { WindowSettingsUiComponent } from './window-settings-ui/window-settings-ui.component'


@NgModule({
  imports: [
    CommonModule,
    SharedModule
  ],
  declarations: [WindowSettingsUiComponent]
})
export class WindowSettingsModule { }
