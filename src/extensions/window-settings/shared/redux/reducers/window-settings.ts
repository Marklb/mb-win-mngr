import { IWindowSettingsInitialState } from '../../models'

import {
  CREATE_WINDOW_SETTINGS_WINDOW_INSTANCE
} from '../actions/window-settings'


const initialState: IWindowSettingsInitialState = {
  windowInstances: []
}

export default function windowSettings(state = initialState, action) {
  switch (action.type) {
    case CREATE_WINDOW_SETTINGS_WINDOW_INSTANCE: {
      const instance = {
        // name: action.payload || getUniqueWindowInstanceName(state.windowInstances),
        name: action.payload,
        isOpen: false
      }
      return {
        ...state,
        windowInstances: [...state.windowInstances, instance],
      }
    }

    default:
      return state
  }
}
