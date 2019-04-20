import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { FormsModule } from '@angular/forms'
import { BrowserModule } from '@angular/platform-browser'

import { CardWidgetModule, WindowTitleBarModule } from '@win-mngr/ui'

import { AppUserModelIdInputComponent } from './app-user-model-id-input/app-user-model-id-input.component'
import { WindowSettingsRoutingModule } from './window-settings-router.module'
import { WindowSettingsUiComponent } from './window-settings-ui/window-settings-ui.component'
import { WindowSettingsComponent } from './window-settings.component'


@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    FormsModule,
    WindowSettingsRoutingModule,
    WindowTitleBarModule,
    CardWidgetModule
  ],
  declarations: [
    WindowSettingsUiComponent,
    AppUserModelIdInputComponent,
    WindowSettingsComponent
  ],
  bootstrap: [
    // WindowSettingsUiComponent,
    // AppUserModelIdInputComponent,
    WindowSettingsComponent
  ]
})
export class ExtensionModule { }
