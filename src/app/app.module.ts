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
import { WindowGroupsComponent } from './components/window-groups/window-groups.component'
import { ElectronWindowBaseComponent } from './components/electron-window-base/electron-window-base.component'
import { MainComponent } from './components/main/main.component'
import { RouteNotFoundComponent } from './components/route-not-found/route-not-found.component'
import { HotkeysManagerComponent, HotkeysListComponent, HotkeyPanelComponent } from './components/hotkeys'
import { WindowUiTitleBarComponent } from './components/window-ui/window-ui-title-bar/window-ui-title-bar.component'
import { WindowBaseHotkeysManagerComponent } from './components/window-base'
import { ExtensionBaseComponent } from './components/extension-base/extension-base.component'
import { extensionRoutes, extensionModules } from 'extensions'


const appRoutes: Routes = [
  { path: '', redirectTo: '/main', pathMatch: 'full' },
  { path: 'hotkeys-manager', component: WindowBaseHotkeysManagerComponent },
  { path: 'window-groups', component: WindowGroupsComponent },
  {
    path: 'extension', component: ExtensionBaseComponent,
    children: extensionRoutes
  },
  { path: 'main', component: MainComponent },
  { path: '**', component: RouteNotFoundComponent }
]

@NgModule({
  declarations: [
    AppComponent,
    WindowGroupsComponent,
    ElectronWindowBaseComponent,
    MainComponent,
    RouteNotFoundComponent,
    HotkeysManagerComponent,
    HotkeysListComponent,
    HotkeyPanelComponent,
    WindowUiTitleBarComponent,
    WindowBaseHotkeysManagerComponent,
    ExtensionBaseComponent
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
    NgxDatatableModule,
    ...extensionModules
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
