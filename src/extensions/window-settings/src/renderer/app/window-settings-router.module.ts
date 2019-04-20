import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'

import { WindowSettingsUiComponent } from './window-settings-ui/window-settings-ui.component'

const routes: Routes = [
  {
    path: ':hWnd',
    component: WindowSettingsUiComponent
  }
  // {
  //   path: '',
  //   component: WindowSettingsUiComponent
  // }
]

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class WindowSettingsRoutingModule { }
