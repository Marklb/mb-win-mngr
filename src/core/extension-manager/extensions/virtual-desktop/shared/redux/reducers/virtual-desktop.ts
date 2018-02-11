import { IVirtualDesktop, IVirtualDesktopInitialState } from '../../models'

import {
  ADD_VIRTUAL_DESKTOP,
  UPDATE_VIRTUAL_DESKTOP_INDEX
} from '../actions/virtual-desktop'


const initialState: IVirtualDesktopInitialState = {
  virtualDesktops: [],
  selectedVirtualDesktopIndex: -1
}

export default function virtualDesktop(state = initialState, action) {
  switch (action.type) {
    case ADD_VIRTUAL_DESKTOP: {
      return {
        ...state,
        virtualDesktops: [...state.virtualDesktops, action.payload],
      }
    }

    case UPDATE_VIRTUAL_DESKTOP_INDEX: {
      let i = state.selectedVirtualDesktopIndex
      if (i > state.virtualDesktops.length - 1) {
        i = state.virtualDesktops.length - 1
      } else if (i < 0 && state.virtualDesktops.length > 0) {
        i = 0
      }
      return {
        ...state,
        selectedVirtualDesktopIndex: i,
      }
    }

    default:
      return state
  }
}
