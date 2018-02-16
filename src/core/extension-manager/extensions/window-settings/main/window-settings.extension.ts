import { IExtension } from '../../../extension'
import { Core } from '../../../../core'
import { Subscription } from 'rxjs/Subscription'
import { Hotkey, HotkeyManager } from '../../../../hotkeys'
import { WinApiTypes } from '../../../../utilities/win-api-utils'
import { Extension } from '../../../extension'
import { ActionsManager } from '../../../../actions-manager'
import { WindowsManager } from '../../../../windows-manager'
import { StoreContainer } from '../../../../../shared/redux/store/configureStore'
import { Store } from 'redux'
import {  } from '../shared/redux/actions/window-settings'
import {  } from '../shared/models'
import * as winApi from 'mb-winapi-node'
import * as winApiUtils from '../../../../utilities/win-api-utils'
const robotjs = require ('robot-js')

const winUrl: string = `file:///E:/Git/mb-win-mngr/dist/index.html#/extension/window-settings-ui`

@Extension({})
export class WindowSettingsExtension implements IExtension {

  extensionId: string = 'window-settings'
  extensionName: string = 'Window Settings'
  extensionConfig: any = {}
  extensionConfigPath: string = 'E:/Git/mb-win-mngr/src/core/extension-manager/extensions/window-settings/main/window-settings.config.json'

  private _subscriptions: Subscription[] = []
  private _registeredHotkeys: Hotkey[] = []

  // private _windowOpen: boolean = false
  // private _windowRef: any
  private _windowRefs: any[] = []

  public store: Store<any>

  constructor(public actionsManager: ActionsManager,
              public windowsManager: WindowsManager,
              public hotkeyManager: HotkeyManager,
              public storeContainer: StoreContainer) {
    this.store = this.storeContainer.store
  }

  initialize(): void {
    this._initActions()
    this._initHotkeys()
    this._initIpcEvents()

    // this.store.subscribe(async () => {
    //   console.log('WindowSettingsExtension state: ', this.store.getState())
    // })

    // console.log('this.extensionConfig: ', this.extensionConfig)
  }

  ready(): void {
    this.openWindow('settings-window-1')
  }

  destroy(): void {

  }

  private _initActions(): void {
    // this._subscriptions.push(this.actionsManager
    //   .registerAction('window-settings:')
    //   .subscribe(data => {

    //   }))
  }

  private _initHotkeys(): void {

  }

  private _initIpcEvents(): void {

  }

  public openWindow(name: string): void {
    // if (!this._windowOpen) {
    //   const win = this.windowsManager.openWindow(winUrl, {
    //     width: 600,
    //     height: 800,
    //     frame: false
    //   } as Electron.BrowserWindowConstructorOptions)
    //   win.webContents.openDevTools()
    //   this._windowRef = win
    //   this._windowOpen = true
    // } else {
    //   if (this._windowRef) {
    //     this._windowRef.close()
    //     this._windowRef = null
    //   }
    //   this._windowOpen = false
    // }

    const wRefItem = this._windowRefs.find(x => x.name === name)
    if (wRefItem === undefined) {
      const win = this.windowsManager.openWindow(`${winUrl}/${name}`, {
        width: 600,
        height: 800,
        frame: false
      } as Electron.BrowserWindowConstructorOptions)
      win.webContents.openDevTools()

      this._windowRefs.push({
        name: name,
        ref: win
      })
    }
  }

}
