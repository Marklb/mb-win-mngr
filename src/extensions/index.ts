export const extensionRoutes = [
  {
    path: 'processes-list',
    loadChildren: 'extensions/processes-list/renderer/processes-list.module#ProcessesListModule'
  },
  {
    path: 'virtual-desktop',
    loadChildren: 'extensions/virtual-desktop/renderer/virtual-desktop.module#VirtualDesktopModule'
  },
  {
    path: 'window-settings-ui',
    loadChildren: 'extensions/window-settings/renderer/window-settings.module#WindowSettingsModule'
  },
  {
    path: 'ext-test-akita',
    loadChildren: 'extensions/ext-test-akita/renderer/ext-test-akita.module#ExtTestAkitaModule'
  },
  {
    path: 'window-presets',
    loadChildren: 'extensions/window-presets/renderer/window-presets.module#WindowPresetsModule'
  }
]
