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
import { VirtualDesktopExtension } from '../extensions/virtual-desktop/main/virtual-desktop.extension'
import { WindowSettingsExtension } from '../extensions/window-settings/main/window-settings.extension'
import { Subscription } from 'rxjs/Subscription'
import configureStore, { StoreContainer } from '../shared/redux/store/configureStore'
import { setGithubEnabled } from '../shared/redux/actions/settings'
import { Inject, Injector } from '../shared/common/injector'
import { Store } from 'redux'
const { ipcMain } = require('electron')
const robotjs = require ('robot-js')

declare var global: any

// @Inject
export class Core {

  public windowsManager: WindowsManager
  public ipcServer: IpcServer
  public hotkeyManager: HotkeyManager
  public actionsManager: ActionsManager
  public extensionManager: ExtensionManager

  private _subscriptions: Subscription[] = []

  public storeContainer: StoreContainer
  public store: Store<any>

  constructor() { }

  public async init(): Promise<any> {
    this.store = configureStore(global.state, 'main')
    this.storeContainer = Injector.get(StoreContainer)
    this.storeContainer.store = this.store

    // this.store.subscribe(async () => {
    //   console.log('Core state: ', this.store.getState())
    // })

    this.ipcServer = Injector.get(IpcServer)
    this.windowsManager = Injector.get(WindowsManager)
    this.actionsManager = Injector.get(ActionsManager)
    // this.hotkeyManager = new HotkeyManager(this.ipcServer, this.actionsManager)
    this.hotkeyManager = Injector.get(HotkeyManager)

    this._registerActions()

    //
    this.hotkeyManager.init()

    //
    this.extensionManager = new ExtensionManager(this, [
      VirtualDesktopExtension,
      WindowSettingsExtension
    ])
    await this.extensionManager.loadExtensions()

    //
    this._registerIpcEvents()
    this.hotkeyManager.loadConfig('E:/Git/mb-win-mngr/src/core/default-configs/hotkeys.json')
      .then(() => { this.hotkeyManager.startListening() })

    //
    // this._registerActions()

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

    // TODO: Move to a good location
    // Init done
    await this.extensionManager.ready()
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
      .registerAction('test:action2').subscribe(data => {
        this.store.dispatch(setGithubEnabled(true))
      }))

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
