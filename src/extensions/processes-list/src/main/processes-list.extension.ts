// require('tsconfig-paths/register')

import * as winApi from '@marklb/mb-winapi-node'
import { ActionsManager } from '@win-mngr/core/actions-manager'
// import { IExtension, Extension } from '../../../../core/extension-manager/extension'
import { Core } from '@win-mngr/core/core'
import { Extension, IExtension } from '@win-mngr/core/extension-manager/extension'
import { Hotkey, HotkeyManager } from '@win-mngr/core/hotkeys'
import { extensionsPath, toRouteUrl, WinApiTypes } from '@win-mngr/core/utilities'
import { WindowsManager } from '@win-mngr/core/windows-manager/windows-manager'
import { Subscription } from 'rxjs'
// const robotjs = require ('robot-js')

// import { ACCENT_STATE, SetWindowCompositionAttribute } from 'windows-swca'

const extensionRootPath = `${extensionsPath()}/processes-list`

@Extension({})
export class ProcessesListExtension implements IExtension {

  extensionId = 'processes-list'
  extensionName = 'Processes List'
  extensionConfig: any = {}
  extensionConfigPath = `${extensionRootPath}/config/processes-list.config.json`

  private _subscriptions: Subscription[] = []
  private _registeredHotkeys: Hotkey[] = []

  private _windowRef: Electron.BrowserWindow
  private _windowOpen = false

  // public winUrl: string = toRouteUrl('extension/processes-list')
  public winUrl = 'E:/Git/mb-win-mngr/src/extensions/processes-list/dist/renderer/processes-list/index.html'

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
  }

  ready(): void {
    console.log('ProcessesListExtension ready')
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

      // win.once('ready-to-show', () => {
      //   console.log('~~~~~~~~~SET VIBRANCY')
      //   const attribValue = ACCENT_STATE.ACCENT_ENABLE_ACRYLICBLURBEHIND
      //   const color = 0x01000000
      //   SetWindowCompositionAttribute(win.getNativeWindowHandle(), attribValue, color)
      // })

      // setTimeout(() => {
      //   win.show()
      // }, 5000)

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
