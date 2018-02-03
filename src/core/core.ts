import { WindowsManager } from './windows-manager'
import * as winApi from 'mb-winapi-node'
import * as winApiUtils from './utilities/win-api-utils'
import { Process } from '../models/process'
import { WindowData } from '../models/window-data'
import { IpcServer } from '../shared/ipc/ipc-server'
import { IpcAction, IpcEvent, IpcData, IpcDataType } from '../shared/ipc'
import { WinApiTypes } from './utilities/win-api-utils'
import { HotkeyManager } from './hotkeys'
import { WindowUrls } from './windows-manager-utils'
import { ActionsManager } from './actions-manager'
import { ExtensionManager } from './extension-manager/extension-manager'
import { VirtualDesktopExtension } from './extension-manager/extensions'
import { Subscription } from 'rxjs/Subscription'
const { ipcMain } = require('electron')
const robotjs = require ('robot-js')


export class Core {

  public windowsManager = new WindowsManager
  public ipcServer = new IpcServer
  public hotkeyManager: HotkeyManager
  public actionsManager: ActionsManager
  public extensionManager: ExtensionManager

  private _subscriptions: Subscription[] = []

  constructor() {
    console.log('create core')
  }

  public init(): void {
    console.log('init core')
    this.actionsManager = new ActionsManager
    this.hotkeyManager = new HotkeyManager(this.ipcServer, this.actionsManager)

    //
    this.hotkeyManager.init()

    //
    this.extensionManager = new ExtensionManager(this, [
      VirtualDesktopExtension
    ])

    //
    this._registerIpcEvents()
    this.hotkeyManager.loadConfig('E:/Git/mb-win-mngr/src/core/default-configs/hotkeys.json')
      .then(() => { this.hotkeyManager.startListening() })

    //
    this._registerActions()

    const win1 = this.windowsManager.openWindow(WindowUrls.ProcessesListWindow, {
      width: 600,
      height: 800,
      frame: false
    } as Electron.BrowserWindowConstructorOptions)
    win1.webContents.openDevTools()

    const win2 = this.windowsManager.openWindow(WindowUrls.HotketsManager, {
      width: 600,
      height: 800,
      frame: false
    } as Electron.BrowserWindowConstructorOptions)
    win2.webContents.openDevTools()

    require('devtron').install()

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
      const hWnd: number = parseInt(ipcEvent.data.data.hWnd, 10)
      try {
        const w: WinApiTypes.Window = await winApiUtils.getWindow(hWnd)
        const data = new IpcData
        data.actionName = IpcAction.GetWindowData
        data.data = { windowData: w }
        this.ipcServer.send(data, ipcEvent.event.sender)
      } catch (e) {
        console.log(e)
      }
    })
  }

  private _registerActions(): void {
    this._subscriptions.push(this.actionsManager
      .registerAction('test:action1').subscribe(data => {
        console.log('\'test:action1\'', winApi.user32.GetForegroundWindow())
      }))

    this._subscriptions.push(this.actionsManager
      .registerAction('test:action2').subscribe(data => console.log(data)))

    this._subscriptions.push(this.actionsManager
      .registerAction('test:action3').subscribe(data => console.log(data)))

    this._subscriptions.push(this.actionsManager
      .registerAction('test:action4').subscribe(data => console.log(data)))

    this._subscriptions.push(this.actionsManager
      .registerAction('test:action5').subscribe(data => console.log(data)))

    this._subscriptions.push(this.actionsManager
      .registerAction('test:action6').subscribe(data => console.log(data)))

    this._subscriptions.push(this.actionsManager
      .registerAction('test:action7').subscribe(data => console.log(data)))

    this._subscriptions.push(this.actionsManager
      .registerAction('test:action8').subscribe(data => console.log(data)))

    this._subscriptions.push(this.actionsManager
      .registerAction('test:action9').subscribe(data => console.log(data)))
  }

}
