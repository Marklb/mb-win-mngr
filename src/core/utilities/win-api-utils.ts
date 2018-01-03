import * as winApi from 'mb-winapi-node'
const robotjs = require ('robot-js')

export namespace WinApiTypes {
  export class Window {
    hWnd: number
    pid: number
    title: string
    appUserModelId: string
  }
}

/**
 * Get native window information
 *
 * @param hWnd Native window handle
 */
export const getWindow = async (hWnd: number): Promise<WinApiTypes.Window> => {
  const win = robotjs.Window(hWnd)

  const w = new WinApiTypes.Window
  w.hWnd = win.getHandle()
  w.pid = win.getPID()
  w.title = win.getTitle()
  w.appUserModelId = await winApi.getAppUserModelIID(hWnd)

  return w
}


/**
 * Get all native windows information
 */
export const getWindows = async (): Promise<WinApiTypes.Window[]> => {
  const wList: WinApiTypes.Window[] = []

  const wins = robotjs.Window.getList()
  for (const w of wins) {
    const win = {
      hWnd: w.getHandle(),
      pid: w.getPID(),
      title: w.getTitle()
    } as WinApiTypes.Window
    wList.push(win)
  }

  return wList
}
