import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'

import { FlexLayoutModule } from '@angular/flex-layout'
// import { NgbModule } from '@ng-bootstrap/ng-bootstrap'
import { NgxDatatableModule } from '@swimlane/ngx-datatable'

// import { SharedModule } from 'app/shared/shared.module'

// import { WindowTitleBarModule } from '../../../../../ui/app/modules/window-title-bar'
import { WindowTitleBarModule } from '@win-mngr/ui'

// import {} from ''

import { ProcessesListComponent } from './processes-list/processes-list.component'


@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    FlexLayoutModule,
    // NgbModule,
    NgxDatatableModule,
    // SharedModule,
    WindowTitleBarModule
  ],
  declarations: [ProcessesListComponent],
  bootstrap: [ProcessesListComponent]
})
export class ExtensionModule { }
