import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'

import { ExtTestAkitaComponent } from './ext-test-akita/ext-test-akita.component'

const routes: Routes = [
  {
    path: '',
    component: ExtTestAkitaComponent
  }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ExtTestAkitaRoutingModule { }
