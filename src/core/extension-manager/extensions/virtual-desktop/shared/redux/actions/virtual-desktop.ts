import { IVirtualDesktop } from '../../models'

export const ADD_VIRTUAL_DESKTOP = 'ADD_VIRTUAL_DESKTOP'
export const UPDATE_VIRTUAL_DESKTOP_INDEX = 'UPDATE_VIRTUAL_DESKTOP_INDEX'


export function addVirtualDesktop(virtualDesktop: IVirtualDesktop) {
  console.log('addVirtualDesktop: ', virtualDesktop)
  return {
    type: ADD_VIRTUAL_DESKTOP,
    payload: virtualDesktop,
  }
}

export function updateVirtualDesktopIndex() {
  console.log('updateVirtualDesktopIndex: ')
  return {
    type: UPDATE_VIRTUAL_DESKTOP_INDEX
  }
}
