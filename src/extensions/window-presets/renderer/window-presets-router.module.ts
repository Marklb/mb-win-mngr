import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'

import { WindowPresetsComponent } from './window-presets/window-presets.component'

const routes: Routes = [
  {
    path: '',
    component: WindowPresetsComponent
  }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WindowPresetsRoutingModule { }
