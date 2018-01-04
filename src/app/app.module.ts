import { BrowserModule } from '@angular/platform-browser'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { NgModule } from '@angular/core'
import { CommonModule, APP_BASE_HREF } from '@angular/common'
import { RouterModule, Routes } from '@angular/router'
import { FormsModule } from '@angular/forms'
import { FlexLayoutModule } from '@angular/flex-layout'
import { AngularDraggableModule } from 'angular2-draggable'
import { NgbModule } from '@ng-bootstrap/ng-bootstrap'
import { NgxDatatableModule } from '@swimlane/ngx-datatable'

import { ElectronService } from './providers/electron.service'
import { AppWindowService } from './providers/app-window.service'

import { AppComponent } from './components/app.component'
import { ProcessesListComponent } from './components/processes-list/processes-list.component'
import { ProcessSettingsComponent } from './components/process-settings/process-settings.component'
import { WindowSettingsBaseComponent } from './components/window-settings-base/window-settings-base.component'
import { WindowGroupsComponent } from './components/window-groups/window-groups.component'
import { ElectronWindowBaseComponent } from './components/electron-window-base/electron-window-base.component'
import { MainComponent } from './components/main/main.component'
import { RouteNotFoundComponent } from './components/route-not-found/route-not-found.component'
import { HotkeysManagerComponent } from './components/hotkeys-manager/hotkeys-manager.component'
import { DebugPanelComponent } from './components/debug-panel/debug-panel.component'
import { WindowUiTitleBarComponent } from './components/window-ui/window-ui-title-bar/window-ui-title-bar.component'
import { WindowBaseHotkeysManagerComponent } from './components/window-base'


const appRoutes: Routes = [
  { path: 'debug-panel', component: DebugPanelComponent },
  { path: 'hotkeys-manager', component: WindowBaseHotkeysManagerComponent },
  { path: 'window-groups', component: WindowGroupsComponent },
  { path: 'window-settings/:hWnd', component: WindowSettingsBaseComponent },
  { path: 'processes-list', component: ProcessesListComponent, data: { popout: 'processes-list' } },
  { path: 'main', component: MainComponent },
  // { path: '', component: MainComponent },
  { path: '',
    redirectTo: '/main',
    pathMatch: 'full'
  },
  { path: '**', component: RouteNotFoundComponent }
]

@NgModule({
  declarations: [
    AppComponent,
    ProcessesListComponent,
    ProcessSettingsComponent,
    WindowGroupsComponent,
    ElectronWindowBaseComponent,
    MainComponent,
    RouteNotFoundComponent,
    HotkeysManagerComponent,
    DebugPanelComponent,
    WindowSettingsBaseComponent,
    WindowUiTitleBarComponent,
    WindowBaseHotkeysManagerComponent
  ],
  imports: [
    RouterModule.forRoot(
      appRoutes,
      {
        useHash: true,
        // enableTracing: true // <-- debugging purposes only
      }
    ),
    BrowserModule,
    BrowserAnimationsModule,
    CommonModule,
    FormsModule,
    FlexLayoutModule,
    AngularDraggableModule,
    NgbModule.forRoot(),
    NgxDatatableModule
  ],
  providers: [
    ElectronService,
    AppWindowService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
