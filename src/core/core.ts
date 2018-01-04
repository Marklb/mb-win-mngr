import { WindowsManager } from './windows-manager'
import * as winApi from 'mb-winapi-node'
import * as winApiUtils from './utilities/win-api-utils'
import { Process } from '../models/process'
import { WindowData } from '../models/window-data'
import { IpcServer } from '../shared/ipc/ipc-server'
import { IpcAction, IpcEvent, IpcData, IpcDataType } from '../shared/ipc'
import { WinApiTypes } from './utilities/win-api-utils'
const { ipcMain } = require('electron')
const robotjs = require ('robot-js')
const { WindowUrls } = require('./windows-manager-utils')


export class Core {

  public windowsManager = new WindowsManager
  public ipcServer = new IpcServer

  constructor() {
    console.log('init core')
    this._registerIpcEvents()
  }

  public init(): void {
    // const win1 = this.windowsManager.openWindow(WindowUrls.ProcessesListWindow, {
    //   width: 600,
    //   height: 800,
    //   frame: false
    // } as Electron.BrowserWindowConstructorOptions)
    // win1.webContents.openDevTools()

    const win1 = this.windowsManager.openWindow(WindowUrls.HotketsManager, {
      width: 600,
      height: 800,
      frame: false
    } as Electron.BrowserWindowConstructorOptions)
    win1.webContents.openDevTools()

    // const win2 = core.windowsManager.openWindow(WindowUrls.DebugWindow)


    // win1.on('ready-to-show', () => { win2.focus() })
    // win2.on('ready-to-show', () => { win2.focus() })
  }

  private _registerIpcEvents(): void {
    //
    // GetOpenWindows
    //
    this.ipcServer.listen(IpcAction.GetOpenWindows, async (ipcEvent: IpcEvent) => {
      // console.log('IpcAction.GetOpenWindows', ipcEvent)
      const data = new IpcData
      data.actionName = IpcAction.GetOpenWindows
      data.data = { windows: await winApiUtils.getWindows() }
      this.ipcServer.send(data, ipcEvent.event.sender)
    })

    //
    // OpenElectronWindow
    //
    this.ipcServer.listen(IpcAction.OpenElectronWindow, async (ipcEvent: IpcEvent) => {
      console.log('IpcAction.OpenElectronWindow', ipcEvent)
    })

    //
    // WindowSelect
    //
    this.ipcServer.listen(IpcAction.WindowSelect, async (ipcEvent: IpcEvent) => {
      // console.log('IpcAction.WindowSelect', ipcEvent)
      const win = this.windowsManager.openWindow(WindowUrls.WindowSettings + '/' + ipcEvent.data.data.hWnd, {
        width: 600,
        height: 800,
        frame: false
      } as Electron.BrowserWindowConstructorOptions)
      win.webContents.openDevTools()
    })

    //
    // GetWindowData
    //
    this.ipcServer.listen(IpcAction.GetWindowData, async (ipcEvent: IpcEvent) => {
      console.log('IpcAction.GetWindowData', ipcEvent)
      const hWnd: number = ipcEvent.data.data.hWnd
      console.log('hWnd', hWnd)
      try {
        const w: WinApiTypes.Window = await winApiUtils.getWindow(hWnd)
        console.log(w)
      } catch (e) {
        console.log(e)
      }
    })
  }

}
