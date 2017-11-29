import { BrowserModule } from '@angular/platform-browser'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { FormsModule } from '@angular/forms'
import { FlexLayoutModule } from '@angular/flex-layout'
import { AngularDraggableModule } from 'angular2-draggable'
import { NgbModule } from '@ng-bootstrap/ng-bootstrap'
import { NgxDatatableModule } from '@swimlane/ngx-datatable'

import { ElectronService } from './providers/electron.service'

import { AppComponent } from './components/app.component'
import { ProcessesListComponent } from './components/processes-list/processes-list.component'
import { ProcessSettingsComponent } from './components/process-settings/process-settings.component'
import { WindowGroupsComponent } from './components/window-groups/window-groups.component'


@NgModule({
  declarations: [
    AppComponent,
    ProcessesListComponent,
    ProcessSettingsComponent,
    WindowGroupsComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    CommonModule,
    FormsModule,
    FlexLayoutModule,
    AngularDraggableModule,
    NgbModule.forRoot(),
    NgxDatatableModule
  ],
  providers: [ElectronService],
  bootstrap: [AppComponent]
})
export class AppModule { }
