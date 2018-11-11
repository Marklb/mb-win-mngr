import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'

import { WindowSettingsUiComponent } from './window-settings-ui/window-settings-ui.component'

const routes: Routes = [
  {
    path: ':hWnd',
    component: WindowSettingsUiComponent
  }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WindowSettingsRoutingModule { }
