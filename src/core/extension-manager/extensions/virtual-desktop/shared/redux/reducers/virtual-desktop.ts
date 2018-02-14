import { IVirtualDesktop, IVirtualDesktopInitialState, VirtualDesktopActionState } from '../../models'

import {
  ADD_VIRTUAL_DESKTOP,
  UPDATE_VIRTUAL_DESKTOP_INDEX,
  PREVIOUS_VIRTUAL_DESKTOP_INDEX,
  NEXT_VIRTUAL_DESKTOP_INDEX,
  SET_VIRTUAL_DESKTOP_STATE,
  SET_VIRTUAL_DESKTOP_PROCESS
} from '../actions/virtual-desktop'


const initialState: IVirtualDesktopInitialState = {
  virtualDesktops: [],
  selectedVirtualDesktopIndex: -1,
  actionState: VirtualDesktopActionState.Disabled
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

    case PREVIOUS_VIRTUAL_DESKTOP_INDEX: {
      let i = state.selectedVirtualDesktopIndex
      if (state.selectedVirtualDesktopIndex > 0) {
        i = state.selectedVirtualDesktopIndex - 1
      }
      return {
        ...state,
        selectedVirtualDesktopIndex: i,
      }
    }

    case NEXT_VIRTUAL_DESKTOP_INDEX: {
      let i = state.selectedVirtualDesktopIndex
      if (i >= 0 && i < state.virtualDesktops.length - 1) {
        i = state.selectedVirtualDesktopIndex + 1
      }
      return {
        ...state,
        selectedVirtualDesktopIndex: i,
      }
    }

    case SET_VIRTUAL_DESKTOP_STATE: {
      return {
        ...state,
        actionState: action.payload
      }
    }

    case SET_VIRTUAL_DESKTOP_PROCESS: {
      if (state.actionState === VirtualDesktopActionState.ProcessSelect) {
        const item = action.payload

        const i = state.selectedVirtualDesktopIndex
        const vDesktop = state.virtualDesktops[i]
        let items = vDesktop.processItems

        if (items === undefined) {
          items = []
        }

        const idx = items.findIndex(x => x.index === item.index)

        if (idx === -1) {
          items.push(item)
        } else {
          items[idx].hWnd = item.hWnd
        }

        return {
          ...state,
          virtualDesktops: state.virtualDesktops
        }
      } else {
        return {
          ...state
        }
      }
    }

    default:
      return state
  }
}
