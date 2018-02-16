export interface IWindowSettingsSettings {
  hWnd: number
  pid: number
  title: string
  appUserModelId: string

  position: { x: number, y: number, width: number, height: number }
}

export interface IWindowSettingsWindowInstance {
  name: string
  isOpen: boolean
  settings: IWindowSettingsSettings
}

export interface IWindowSettingsInitialState {
  windowInstances: IWindowSettingsWindowInstance[]
}
