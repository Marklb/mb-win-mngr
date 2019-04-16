import * as winApi from '@marklb/mb-winapi-node'
import { Subscription } from 'rxjs'
import { ActionsManager } from '../../../core/actions-manager'
import { Core } from '../../../core/core'
import { Extension, IExtension } from '../../../core/extension-manager/extension'
import { Hotkey, HotkeyManager } from '../../../core/hotkeys'
import { extensionsPath, toRouteUrl, WinApiTypes } from '../../../core/utilities'
import { WindowsManager } from '../../../core/windows-manager/windows-manager'
import { IpcAction, IpcData, IpcEvent } from '../../../shared/ipc'
import { IpcServer } from '../../../shared/ipc/ipc-server'
const robotjs = require ('robot-js')

const extensionRootPath = `${extensionsPath()}/window-settings`

@Extension({})
export class WindowSettingsExtension implements IExtension {

  extensionId = 'window-settings'
  extensionName = 'Window Settings'
  extensionConfig: any = {}
  extensionConfigPath = `${extensionRootPath}/config/window-settings.config.json`

  private _subscriptions: Subscription[] = []
  private _registeredHotkeys: Hotkey[] = []

  private _windowRefs: any[] = []

  public winUrl: string = toRouteUrl('extension/window-settings-ui')

  constructor(
    public actionsManager: ActionsManager,
    public windowsManager: WindowsManager,
    public hotkeyManager: HotkeyManager,
    public ipcServer: IpcServer,
  ) { }

  initialize(): void {
    this._initActions()
    this._initHotkeys()
    this._initIpcEvents()

    // console.log('this.extensionConfig: ', this.extensionConfig)
  }

  ready(): void {
    // this.openWindow('settings-window-1')
  }

  destroy(): void {

  }

  private _initActions(): void {
    this._subscriptions.push(this.actionsManager
      .registerAction('window-settings:open-window')
      .subscribe(event => {
        this.openWindow(`${event.data.hWnd}`)
      }))
  }

  private _initHotkeys(): void {

  }

  private _initIpcEvents(): void {
    this.ipcServer.listen('ext:setAppUserModelId', async (ipcEvent: IpcEvent) => {
      const data = new IpcData()
      data.actionName = 'ext:setAppUserModelId'
      // data.data = { windows: await winApiUtils.getWindows() }
      data.data = {}

      winApi.setAppUserModelIID(
        ipcEvent.data.data.hWnd,
        ipcEvent.data.data.appUserModelId
      )

      this.ipcServer.send(data, ipcEvent.event.sender)
    })
  }

  public openWindow(name: string): void {
    const wRefItem = this._windowRefs.find(x => x.name === name)
    if (wRefItem === undefined) {
      let win = this.windowsManager.openWindow(`${this.winUrl}/${name}`, {
        width: 600,
        height: 800,
        frame: false
      })
      win.webContents.openDevTools()

      this._windowRefs.push({
        name: name,
        ref: win
      })

      win.on('closed', () => {
        this._windowRefs = this._windowRefs.filter(item => item.ref !== win)
        win = null
      })
    }
  }

}
