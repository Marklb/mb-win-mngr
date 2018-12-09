import { IExtension, Extension } from '../../../core/extension-manager/extension'
import { Core } from '../../../core/core'
import { Subscription } from 'rxjs'
import { Hotkey, HotkeyManager } from '../../../core/hotkeys'
import { ActionsManager } from '../../../core/actions-manager'
import { WindowsManager } from '../../../core/windows-manager/windows-manager'
import * as winApi from '@marklb/mb-winapi-node'
import { WinApiTypes, toRouteUrl, extensionsPath } from '../../../core/utilities'
const robotjs = require ('robot-js')

const extensionRootPath: string = `${extensionsPath()}/processes-list`

@Extension({})
export class ProcessesListExtension implements IExtension {

  extensionId: string = 'processes-list'
  extensionName: string = 'Processes List'
  extensionConfig: any = {}
  extensionConfigPath: string = `${extensionRootPath}/config/processes-list.config.json`

  private _subscriptions: Subscription[] = []
  private _registeredHotkeys: Hotkey[] = []

  private _windowRef: Electron.BrowserWindow
  private _windowOpen: boolean = false

  public winUrl: string = toRouteUrl('extension/processes-list')

  constructor(
    public actionsManager: ActionsManager,
    public windowsManager: WindowsManager,
    public hotkeyManager: HotkeyManager,
  ) { }

  initialize(): void {
    this._initActions()
    this._initHotkeys()
    this._initIpcEvents()

    // this.store.subscribe(async () => {
    //   console.log('ProcessesListExtension state: ', this.store.getState())
    // })

    // console.log('this.extensionConfig: ', this.extensionConfig)
  }

  ready(): void {
    // this.openWindow()
  }

  destroy(): void {

  }

  private _initActions(): void {
    // this._subscriptions.push(this.actionsManager
    //   .registerAction('processes-list:')
    //   .subscribe(data => {

    //   }))
  }

  private _initHotkeys(): void {

  }

  private _initIpcEvents(): void {

  }

  public openWindow(): void {
    if (!this._windowOpen) {
      const win = this.windowsManager.openWindow(this.winUrl, {
        width: 600,
        height: 800,
        frame: false
      })
      win.webContents.openDevTools()
      this._windowRef = win
      this._windowOpen = true
    } else {
      if (this._windowRef) {
        this._windowRef.close()
        this._windowRef = null
      }
      this._windowOpen = false
    }
  }

}
