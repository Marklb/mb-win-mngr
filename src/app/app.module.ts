import { BrowserModule } from '@angular/platform-browser'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { FormsModule } from '@angular/forms'
import { FlexLayoutModule } from '@angular/flex-layout'
import { NgxUIModule } from '@swimlane/ngx-ui'

import { ElectronService } from './providers/electron.service'

import { AppComponent } from './components/app.component'
import { ProcessesListComponent } from './components/processes-list/processes-list.component'
import { PanelProcessesListComponent } from './components/panels/panel-processes-list/panel-processes-list.component'
import { PanelProcessSettingsComponent } from './components/panels/panel-process-settings/panel-process-settings.component'
import { PanelMainComponent } from './components/panels/panel-main/panel-main.component'


@NgModule({
  declarations: [
    AppComponent,
    ProcessesListComponent,
    PanelProcessesListComponent,
    PanelProcessSettingsComponent,
    PanelMainComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    CommonModule,
    FormsModule,
    FlexLayoutModule,
    NgxUIModule
  ],
  providers: [ElectronService],
  bootstrap: [AppComponent]
})
export class AppModule { }
