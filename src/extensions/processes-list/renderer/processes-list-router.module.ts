import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'

import { ProcessesListComponent } from './processes-list/processes-list.component'

const routes: Routes = [
  {
    path: '',
    component: ProcessesListComponent
  }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProcessesListRoutingModule { }
