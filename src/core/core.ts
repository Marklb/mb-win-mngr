import { Subscription } from 'rxjs'
import { ConfigManager } from './config-manager/config-manager'

import * as winApi from '@marklb/mb-winapi-node'

import { ActionsManager } from './actions-manager'
import { Injector } from './common/injector'
import { ExtensionManager } from './extension-manager/extension-manager'
import { HotkeyManager } from './hotkeys'
import { IpcAction, IpcData, IpcDataType, IpcEvent, IpcServer } from './ipc'
import * as winApiUtils from './utilities/win-api-utils'
import { WinApiTypes } from './utilities/win-api-utils'
import { WindowsManager, WindowUrls } from './windows-manager'

// @Inject
export class Core {

  public windowsManager: WindowsManager
  public ipcServer: IpcServer
  public hotkeyManager: HotkeyManager
  public actionsManager: ActionsManager
  public extensionManager: ExtensionManager
  public configManager: ConfigManager

  private _subscriptions: Subscription[] = []

  constructor() { }

  public async init(): Promise<any> {
    console.log('Init Core')
    this.ipcServer = Injector.get(IpcServer)
    this.windowsManager = Injector.get(WindowsManager)
    this.actionsManager = Injector.get(ActionsManager)
    this.hotkeyManager = Injector.get(HotkeyManager)
    this.configManager = Injector.get(ConfigManager)

    await this.configManager.init()

    this._registerActions()

    //
    this.hotkeyManager.init()

    //
    this.extensionManager = new ExtensionManager(this, [
      // VirtualDesktopExtension,
      // WindowSettingsExtension,
      // ProcessesListExtension,
      // ExtTestAkitaExtension,
      // WindowPresetsExtension
    ])
    await this.extensionManager.loadExtensions()

    //
    this._registerIpcEvents()
    this.hotkeyManager.loadConfig('E:/Git/mb-win-mngr/src/core/default-configs/hotkeys.json')
      .then(() => { this.hotkeyManager.startListening() })

    //
    // this._registerActions()

    // const win = this.windowsManager.openWindow('file:///E:/Git/mb-win-mngr/dist/ui/index.html', {
    //   width: 600,
    //   height: 800,
    //   frame: false
    // } as Electron.BrowserWindowConstructorOptions)
    // win.webContents.openDevTools()

    // TODO: Move to an extension
    // const win2 = this.windowsManager.openWindow(WindowUrls.HotketsManager, {
    //   width: 600,
    //   height: 800,
    //   frame: false
    // } as Electron.BrowserWindowConstructorOptions)
    // win2.webContents.openDevTools()

    require('devtron').install()
    // require('electron-redux-devtools').install()

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
      const data = new IpcData()
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
        const data = new IpcData()
        data.actionName = IpcAction.GetWindowData
        data.data = { windowData: w }
        this.ipcServer.send(data, ipcEvent.event.sender)
      } catch (e) {
        console.log(e)
      }
    })

    //
    //
    //
    this.ipcServer.listen(IpcAction.ActionsManagerTriggerAction, async (ipcEvent: IpcEvent) => {
      try {
        this.actionsManager.triggerAction(ipcEvent.data.data.identifier, ipcEvent.data.data.data)
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
