import { BrowserModule } from '@angular/platform-browser'
import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { FormsModule } from '@angular/forms'
import { FlexLayoutModule } from '@angular/flex-layout'
import { NgxUIModule } from '@swimlane/ngx-ui'

import { ElectronService } from './providers/electron.service'

import { AppComponent } from './components/app.component'
import { ProcessesListComponent } from './components/processes-list/processes-list.component';
import { PanelProcessesListComponent } from './components/panels/panel-processes-list/panel-processes-list.component'


@NgModule({
  declarations: [
    AppComponent,
    ProcessesListComponent,
    PanelProcessesListComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    FormsModule,
    FlexLayoutModule,
    NgxUIModule
  ],
  providers: [ElectronService],
  bootstrap: [AppComponent]
})
export class AppModule { }
