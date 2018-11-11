import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'

import { FlexLayoutModule } from '@angular/flex-layout'
import { NgbModule } from '@ng-bootstrap/ng-bootstrap'
import { NgxDatatableModule } from '@swimlane/ngx-datatable'

import { SharedModule } from 'app/shared/shared.module'

import { ProcessesListRoutingModule } from './processes-list-router.module';

import { ProcessesListComponent } from './processes-list/processes-list.component'


@NgModule({
  imports: [
    CommonModule,
    FlexLayoutModule,
    NgbModule,
    NgxDatatableModule,
    SharedModule,
    ProcessesListRoutingModule
  ],
  declarations: [ProcessesListComponent]
})
export class ProcessesListModule { }
