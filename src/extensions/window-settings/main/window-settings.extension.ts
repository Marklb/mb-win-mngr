import { IExtension, Extension } from '../../../core/extension-manager/extension'
import { Core } from '../../../core/core'
import { Subscription } from 'rxjs'
import { Hotkey, HotkeyManager } from '../../../core/hotkeys'
import { ActionsManager } from '../../../core/actions-manager'
import { WindowsManager } from '../../../core/windows-manager/windows-manager'
import * as winApi from '@marklb/mb-winapi-node'
import { WinApiTypes, toRouteUrl, extensionsPath } from '../../../core/utilities'
import { IpcData, IpcEvent, IpcAction } from '../../../shared/ipc'
import { IpcServer } from '../../../shared/ipc/ipc-server'
const robotjs = require ('robot-js')

const extensionRootPath: string = `${extensionsPath()}/window-settings`

@Extension({})
export class WindowSettingsExtension implements IExtension {

  extensionId: string = 'window-settings'
  extensionName: string = 'Window Settings'
  extensionConfig: any = {}
  extensionConfigPath: string = `${extensionRootPath}/config/window-settings.config.json`

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
      const data = new IpcData
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
