export interface IWindowSettingsWindowInstance {
  name: string
  isOpen: boolean
}

export interface IWindowSettingsInitialState {
  windowInstances: IWindowSettingsWindowInstance[]
}
