import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'

import { VirtualDesktopUiComponent } from './virtual-desktop-ui/virtual-desktop-ui.component'

const routes: Routes = [
  {
    path: '',
    component: VirtualDesktopUiComponent
  }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VirtualDesktopRoutingModule { }
