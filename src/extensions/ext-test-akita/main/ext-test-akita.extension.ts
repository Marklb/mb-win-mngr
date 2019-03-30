import { IpcServer } from './../../../core/ipc/ipc-server'
import { TodosQuery } from './../state/todos.query'
import { TodosStore } from './../state/todos.store'
import { IExtension, Extension } from '../../../core/extension-manager/extension'
import { Core } from '../../../core/core'
import { Subscription } from 'rxjs'
import { Hotkey, HotkeyManager } from '../../../core/hotkeys'
import { ActionsManager } from '../../../core/actions-manager'
import { WindowsManager } from '../../../core/windows-manager/windows-manager'
import { toRouteUrl, extensionsPath } from '../../../core/utilities'

import { IpcEvent } from './../../../core/ipc/index'

const extensionRootPath: string = `${extensionsPath()}/ext-test-akita`

@Extension({})
export class ExtTestAkitaExtension implements IExtension {

  extensionId: string = 'ext-test-akita'
  extensionName: string = 'Ext test akita'
  extensionConfig: any = {}
  extensionConfigPath: string = `${extensionRootPath}/config/ext-test-akita.config.json`

  private _subscriptions: Subscription[] = []
  private _registeredHotkeys: Hotkey[] = []

  private _windowRef: Electron.BrowserWindow
  private _windowOpen: boolean = false

  public winUrl: string = toRouteUrl('extension/ext-test-akita')

  private store: TodosStore
  private query: TodosQuery

  constructor(
    public actionsManager: ActionsManager,
    public windowsManager: WindowsManager,
    public hotkeyManager: HotkeyManager,
    public ipcServer: IpcServer,
  ) { }

  initialize(): void {
    this.store = new TodosStore
    this.query = new TodosQuery(this.store)
    this.query.selectAll().subscribe(todos => console.log('todos', todos))

    this.ipcServer.listen('ext-test-akita:add', async (ipcEvent: IpcEvent) => {
      console.log('ext-test-akita:add', ipcEvent)
    })
  }

  ready(): void {
    this.openWindow()
  }

  destroy(): void {
    this.store.destroy()
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
