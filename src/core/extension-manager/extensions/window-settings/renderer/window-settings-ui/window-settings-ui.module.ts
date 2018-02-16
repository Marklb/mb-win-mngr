import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'

import { SharedModule } from '../../../../../../app/shared/shared.module'
import { CardWidgetComponent } from '../../../../../../app/shared/card-widget/card-widget.component'

import { WindowSettingsUiComponent } from './window-settings-ui.component'


@NgModule({
  imports: [
    CommonModule,
    // SharedModule
  ],
  // declarations: [WindowSettingsUiComponent]
  declarations: [WindowSettingsUiComponent, CardWidgetComponent]
})
export class WindowSettingsUiModule { }
