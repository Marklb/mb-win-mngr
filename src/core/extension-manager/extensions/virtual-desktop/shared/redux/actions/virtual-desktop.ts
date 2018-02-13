import { IVirtualDesktop } from '../../models'

export const ADD_VIRTUAL_DESKTOP = 'ADD_VIRTUAL_DESKTOP'
export const UPDATE_VIRTUAL_DESKTOP_INDEX = 'UPDATE_VIRTUAL_DESKTOP_INDEX'
export const PREVIOUS_VIRTUAL_DESKTOP_INDEX = 'PREVIOUS_VIRTUAL_DESKTOP_INDEX'
export const NEXT_VIRTUAL_DESKTOP_INDEX = 'NEXT_VIRTUAL_DESKTOP_INDEX'


export function addVirtualDesktop(virtualDesktop: IVirtualDesktop) {
  return {
    type: ADD_VIRTUAL_DESKTOP,
    payload: virtualDesktop,
  }
}

export function updateVirtualDesktopIndex() {
  return {
    type: UPDATE_VIRTUAL_DESKTOP_INDEX
  }
}

export function previousVirtualDesktopIndex() {
  return {
    type: PREVIOUS_VIRTUAL_DESKTOP_INDEX
  }
}

export function nextVirtualDesktopIndex() {
  return {
    type: NEXT_VIRTUAL_DESKTOP_INDEX
  }
}
