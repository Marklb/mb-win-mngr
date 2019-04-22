import { ActionsManager } from '@win-mngr/core/actions-manager'
import { Extension, IExtension } from '@win-mngr/core/extension-manager/extension'
import { Hotkey, HotkeyManager } from '@win-mngr/core/hotkeys'
import { WindowsManager } from '@win-mngr/core/windows-manager/windows-manager'
import * as pkgDir from 'pkg-dir'
import { Subscription } from 'rxjs'

const extensionRootPath = pkgDir.sync(__dirname)

@Extension({
  name: 'virtual-desktop'
})
export class VirtualDesktopExtension implements IExtension {

  extensionId = 'virtual-desktop'
  extensionName = 'Virtual Desktop'
  extensionConfig: any = {}
  extensionConfigPath = `${extensionRootPath}/config/virtual-desktop.config.json`

  private _subscriptions: Subscription[] = []
  private _registeredHotkeys: Hotkey[] = []

  private _windowRef: Electron.BrowserWindow
  private _windowOpen = false

  public winUrl = `${extensionRootPath}/dist/renderer/virtual-desktop/index.html`

  constructor(
    public actionsManager: ActionsManager,
    public windowsManager: WindowsManager,
    public hotkeyManager: HotkeyManager,
  ) { }

  initialize(): void {
    console.log('VirtualDesktopExtension initialize')
    this._initActions()
    this._initHotkeys()
    this._initIpcEvents()

    // console.log('this.extensionConfig: ', this.extensionConfig)
  }

  ready(): void {
    console.log('VirtualDesktopExtension ready')

    this.openWindow()
  }

  destroy(): void {

  }

  private _initActions(): void {
    this._subscriptions.push(this.actionsManager
      .registerAction('virtual-desktop:')
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

export default VirtualDesktopExtension

export const extension = VirtualDesktopExtension
