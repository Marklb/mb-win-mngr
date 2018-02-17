import { virtualDesktopRoutes, VirtualDesktopModule } from './virtual-desktop/renderer'
import { windowSettingsRoutes, WindowSettingsModule } from './window-settings/renderer'

export const extensionRoutes = [
  ...virtualDesktopRoutes,
  ...windowSettingsRoutes
]

export const extensionModules = [
  VirtualDesktopModule,
  WindowSettingsModule
]
