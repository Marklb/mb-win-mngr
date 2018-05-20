import { virtualDesktopRoutes, VirtualDesktopModule } from './virtual-desktop/renderer'
import { windowSettingsRoutes, WindowSettingsModule } from './window-settings/renderer'
import { processesListRoutes, ProcessesListModule } from './processes-list/renderer'

export const extensionRoutes = [
  ...virtualDesktopRoutes,
  ...windowSettingsRoutes,
  ...processesListRoutes
]

export const extensionModules = [
  VirtualDesktopModule,
  WindowSettingsModule,
  ProcessesListModule
]
