// import * as winApi from '@marklb/mb-winapi-node'
import { registerProxy } from '@marklb/electron-ipc-proxy'
import { ActionsManager } from '@win-mngr/core/actions-manager'
import { Core } from '@win-mngr/core/core'
import { Extension, IExtension } from '@win-mngr/core/extension-manager/extension'
import { Hotkey, HotkeyManager } from '@win-mngr/core/hotkeys'
import { extensionsPath, toRouteUrl, WinApiTypes } from '@win-mngr/core/utilities'
import { WindowsManager } from '@win-mngr/core/windows-manager/windows-manager'
import * as pkgDir from 'pkg-dir'
import { Subscription } from 'rxjs'
import { processListServiceDescriptor } from '../shared/descriptors'

// const todoService = createTodoService(...)
import { ProcessesListService } from './processes-list.service'

const processesListService = new ProcessesListService()
registerProxy(processesListService, processListServiceDescriptor)

// import { getProcessTree } from 'windows-process-tree'

const extensionRootPath = pkgDir.sync(__dirname)

@Extension({
  name: 'processes-list'
})
export class ProcessesListExtension implements IExtension {

  extensionId = 'processes-list'
  extensionName = 'Processes List'
  extensionConfig: any = {}
  extensionConfigPath = `${extensionRootPath}/config/processes-list.config.json`

  private _subscriptions: Subscription[] = []
  private _registeredHotkeys: Hotkey[] = []

  private _windowRef: Electron.BrowserWindow
  private _windowOpen = false

  public winUrl = `${extensionRootPath}/dist/renderer/processes-list/index.html`

  constructor(
    public actionsManager: ActionsManager,
    public windowsManager: WindowsManager,
    public hotkeyManager: HotkeyManager,
  ) { }

  initialize(): void {
    console.log('ProcessesListExtension initialize')
    this._initActions()
    this._initHotkeys()
    this._initIpcEvents()

    // this.store.subscribe(async () => {
    //   console.log('ProcessesListExtension state: ', this.store.getState())
    // })

    // console.log('this.extensionConfig: ', this.extensionConfig)

    // getProcessTree(-1, (tree) => {
    //   console.log(tree)
    // })
  }

  ready(): void {
    console.log('ProcessesListExtension ready')

    console.log('[ProcessesListExtension]', this.extensionConfig)

    this.openWindow()
  }

  destroy(): void {

  }

  private _initActions(): void {
    this._subscriptions.push(this.actionsManager
      .registerAction('processes-list:')
      .subscribe(data => {
        console.log('data', data)
      }))
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
        frame: false,
        backgroundColor: '#00000000',
        show: true
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

export default ProcessesListExtension

export const extension = ProcessesListExtension
