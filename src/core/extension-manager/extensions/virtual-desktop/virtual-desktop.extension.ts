import { IExtension } from '../../extension-manager'
import { Core } from '../../../core'
import * as winApi from 'mb-winapi-node'
import * as winApiUtils from '../../../utilities/win-api-utils'
import { Subscription } from 'rxjs/Subscription'
import { Hotkey } from '../../../hotkeys'

const winUrl: string = `file:///E:/Git/mb-win-mngr/dist/index.html#/extension/virtual-desktop-ui`

export class VirtualDesktopExtension implements IExtension {

  extensionId: string = 'virtual-desktop'
  extensionName: string = 'Virtual Desktop'

  private _subscriptions: Subscription[] = []
  private _registeredHotkeys: Hotkey[] = []

  private _windowOpen: boolean = false
  private _windowRef: any

  constructor(private core: Core) {
    console.log('VirtualDesktopExtension.contructor')
  }

  initialize(): void {
    console.log('VirtualDesktopExtension.initialize')
    this._initActions()
    this._initHotkeys()
  }

  destroy(): void {

  }

  private _initActions(): void {
    this._subscriptions.push(this.core.actionsManager
      .registerAction('virtual-desktop:open-stats-window').subscribe(data => {
        if (!this._windowOpen) {
          console.log('Execute Action [virtual-desktop:open-stats-window]')
          const win = this.core.windowsManager.openWindow(winUrl, {
            width: 600,
            height: 800,
            frame: false
          } as Electron.BrowserWindowConstructorOptions)
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
      }))
  }

  private _initHotkeys(): void {
    this._registeredHotkeys.push(this.core.hotkeyManager.registerHotkey({
      accelerator: 'Pause',
      action: 'virtual-desktop:open-stats-window',
      scope: 'global'
    }))
  }

}
