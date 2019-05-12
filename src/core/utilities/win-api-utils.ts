import * as winApi from '@marklb/mb-winapi-node'
const robotjs = require ('robot-js')
// import { getProcessTree } from 'windows-process-tree'

// tslint:disable-next-line
export namespace WinApiTypes {
  export class Window {
    hWnd: number
    pid: number
    title: string
    appUserModelId: string
    path: string
    name: string
  }
}

/**
 * Get native window information
 *
 * @param hWnd Native window handle
 */
export const getWindow = async (hWnd: number): Promise<WinApiTypes.Window> => {
  // const win = robotjs.Window(hWnd)

  // const w = new WinApiTypes.Window()
  // w.hWnd = win.getHandle()
  // w.pid = win.getPID()
  // w.title = win.getTitle()
  // w.appUserModelId = await winApi.getAppUserModelIID(hWnd)
  // w.path = win.getPath ? win.getPath() : '-?-'
  // w.name = win.getProcess().getName()

  const wins = winApi.getProcesses()
  const win = wins.find(_w => _w.hWnd === hWnd)

  const w = new WinApiTypes.Window()
  w.hWnd = win.hWnd
  w.pid = win.pid
  w.title = win.title
  w.appUserModelId = await winApi.getAppUserModelIID(hWnd)
  w.path = win.path
  w.name = ''

  return w
}

let i = 0

/**
 * Get all native windows information
 */
export const getWindows = async (): Promise<WinApiTypes.Window[]> => {
  const wList: WinApiTypes.Window[] = []

  // const wins = robotjs.Window.getList()
  // const wins = winApi.getProcesses()
  const wins = winApi.getWindows()
  for (const w of wins) {
    if (i === 0) {
      // getProcessTree(w.getPID(), (tree) => {
      //   console.log('tree', tree)
      // })
      i++
    }
    // const win = {
    //   hWnd: w.getHandle(),
    //   pid: w.getPID(),
    //   title: w.getTitle(),
    //   path: w.getPath ? w.getPath() : '-?-',
    //   name: w.getProcess().getName()
    // } as WinApiTypes.Window
    const win = {
      hWnd: w.hWnd,
      pid: w.pid,
      title: w.title,
      path: w.path,
      name: ''
    } as WinApiTypes.Window
    wList.push(win)
  }

  return wList
}
