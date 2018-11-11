import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { FormsModule } from '@angular/forms'

import { SharedModule } from 'app/shared/shared.module'

import { WindowSettingsRoutingModule } from './window-settings-router.module';

import { WindowSettingsUiComponent } from './window-settings-ui/window-settings-ui.component'
import { AppUserModelIdInputComponent } from './app-user-model-id-input/app-user-model-id-input.component'


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    SharedModule,
    WindowSettingsRoutingModule
  ],
  declarations: [
    WindowSettingsUiComponent,
    AppUserModelIdInputComponent
  ]
})
export class WindowSettingsModule { }
