import { APP_BASE_HREF, CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { FlexLayoutModule } from '@angular/flex-layout'
import { FormsModule } from '@angular/forms'
import { BrowserModule } from '@angular/platform-browser'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { RouterModule, Routes } from '@angular/router'
import { NgxDatatableModule } from '@marklb/ngx-datatable'
import { NgbModule } from '@ng-bootstrap/ng-bootstrap'

import { AppWindowService } from './providers/app-window.service'
import { ElectronService } from './providers/electron.service'

import { AppComponent } from './components/app.component'
import { ElectronWindowBaseComponent } from './components/electron-window-base/electron-window-base.component'
import { ExtensionBaseComponent } from './components/extension-base/extension-base.component'
import { HotkeyPanelComponent, HotkeysListComponent, HotkeysManagerComponent } from './components/hotkeys'
import { RouteNotFoundComponent } from './components/route-not-found/route-not-found.component'
import { WindowBaseHotkeysManagerComponent } from './components/window-base'
import { WindowUiTitleBarComponent } from './components/window-ui/window-ui-title-bar/window-ui-title-bar.component'

// import { extensionRoutes } from '@win-mngr/extensions/index'
import { extensionRoutes } from '../../extensions'


const appRoutes: Routes = [
  { path: '', redirectTo: '/main', pathMatch: 'full' },
  { path: 'hotkeys-manager', component: WindowBaseHotkeysManagerComponent },
  {
    path: 'extension', component: ExtensionBaseComponent,
    children: extensionRoutes
  },
  { path: '**', component: RouteNotFoundComponent }
]

@NgModule({
  declarations: [
    AppComponent,
    ElectronWindowBaseComponent,
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
    NgbModule.forRoot(),
    NgxDatatableModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
