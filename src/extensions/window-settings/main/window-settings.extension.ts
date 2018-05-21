import { IExtension, Extension } from '../../../core/extension-manager/extension'
import { Core } from '../../../core/core'
import { Subscription } from 'rxjs'
import { Hotkey, HotkeyManager } from '../../../core/hotkeys'
import { ActionsManager } from '../../../core/actions-manager'
import { WindowsManager } from '../../../core/windows-manager'
import { StoreContainer } from '../../../shared/redux/store/configureStore'
import { Store } from 'redux'
import * as winApi from '@marklb/mb-winapi-node'
import { WinApiTypes, toRouteUrl } from '../../../core/utilities'
import { createWindowSettingsWindowInstance } from '../shared/redux/actions/window-settings'
const robotjs = require ('robot-js')

const extensionRootPath: string = 'E:/Git/mb-win-mngr/src/extensions/window-settings'

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

    this.store.subscribe(async () => {
      console.log('WindowSettingsExtension state: ', this.store.getState())
    })

    // console.log('this.extensionConfig: ', this.extensionConfig)
  }

  ready(): void {
    this.openWindow('settings-window-1')
  }

  destroy(): void {

  }

  private _initActions(): void {
    this._subscriptions.push(this.actionsManager
      .registerAction('window-settings:open-window')
      .subscribe(event => {
        // this.openWindow(`${event.data.hWnd}`)
        this.store.dispatch(createWindowSettingsWindowInstance(`${event.data.hWnd}`))
      }))
  }

  private _initHotkeys(): void {

  }

  private _initIpcEvents(): void {

  }

  public openWindow(name: string): void {
    const wRefItem = this._windowRefs.find(x => x.name === name)
    if (wRefItem === undefined) {
      const win = this.windowsManager.openWindow(`${this.winUrl}/${name}`, {
        width: 600,
        height: 800,
        frame: false
      })
      win.webContents.openDevTools()

      this._windowRefs.push({
        name: name,
        ref: win
      })
    }
  }

}
