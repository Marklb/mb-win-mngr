import {  } from '../../models'

export const CREATE_WINDOW_SETTINGS_WINDOW_INSTANCE = 'CREATE_WINDOW_SETTINGS_WINDOW_INSTANCE'


export function createWindowSettingsWindowInstance(instanceName: string) {
  return {
    type: CREATE_WINDOW_SETTINGS_WINDOW_INSTANCE,
    payload: instanceName,
  }
}
