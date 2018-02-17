import { Routes } from '@angular/router'
import { WindowSettingsUiComponent } from './window-settings-ui/window-settings-ui.component'

const routes: Routes = [
  { path: 'window-settings-ui/:name', component: WindowSettingsUiComponent }
]

export const windowSettingsRoutes = routes
