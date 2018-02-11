import { IExtension } from '../../../extension'
import { Core } from '../../../../core'
import * as winApi from 'mb-winapi-node'
import * as winApiUtils from '../../../../utilities/win-api-utils'
import { Subscription } from 'rxjs/Subscription'
import { Hotkey, HotkeyManager } from '../../../../hotkeys'
import { IpcAction, IpcEvent, IpcData } from '../../../../../shared/ipc'
import { WinApiTypes } from '../../../../utilities/win-api-utils'
import { VirtualDesktopGroup } from './virtual-desktop-group'
import { VirtualDesktopGroupInfo } from './virtual-desktop-common'
import { Extension } from '../../../extension'
import { Injector, Inject } from '../../../../../shared/common/injector'
import { ActionsManager } from '../../../../actions-manager'
import { WindowsManager } from '../../../../windows-manager'
import { IpcServer } from '../../../../../shared/ipc/ipc-server'
import { StoreContainer } from '../../../../../shared/redux/store/configureStore'
import { Store } from 'redux'
import { addVirtualDesktop, updateVirtualDesktopIndex } from '../shared/redux/actions/virtual-desktop'

const winUrl: string = `file:///E:/Git/mb-win-mngr/dist/index.html#/extension/virtual-desktop-ui`

// @Inject
@Extension({})
export class VirtualDesktopExtension implements IExtension {

  extensionId: string = 'virtual-desktop'
  extensionName: string = 'Virtual Desktop'
  extensionConfig: any = {}
  extensionConfigPath: string = 'E:/Git/mb-win-mngr/src/core/extension-manager/extensions/virtual-desktop/main/virtual-desktop-config.json'

  private _subscriptions: Subscription[] = []
  private _registeredHotkeys: Hotkey[] = []

  private _windowOpen: boolean = false
  private _windowRef: any

  public groups: VirtualDesktopGroup[] = []

  public store: Store<any>

  constructor(public actionsManager: ActionsManager,
              public windowsManager: WindowsManager,
              public ipcServer: IpcServer,
              public hotkeyManager: HotkeyManager,
              public storeContainer: StoreContainer) {
    this.store = this.storeContainer.store
  }

  initialize(): void {
    this._initActions()
    this._initHotkeys()
    this._initIpcEvents()

    this.store.subscribe(async () => {
      // persist store changes
      // TODO: should this be blocking / wait? _.throttle?
      // await storage.set('state', store.getState());
      console.log('VirtualDesktopExtension state: ', this.store.getState())
    })

    console.log('this.extensionConfig: ', this.extensionConfig)
    for (const grp of this.extensionConfig.groups) {
      // const newGrp = new VirtualDesktopGroup
      // newGrp.groupName = grp.groupName
      // this.groups.push(newGrp)
      this.store.dispatch(addVirtualDesktop({
        desktopName: grp.groupName
      }))
      this.store.dispatch(updateVirtualDesktopIndex())
    }
  }

  destroy(): void {

  }

  private _initActions(): void {
    this._subscriptions.push(this.actionsManager
      .registerAction('virtual-desktop:open-stats-window').subscribe(data => {
        this.openWindow()
      }))
  }

  private _initHotkeys(): void {
    this._registeredHotkeys.push(this.hotkeyManager.registerHotkey({
      accelerator: 'Pause',
      action: 'virtual-desktop:open-stats-window',
      scope: 'global'
    }))
  }

  public _initIpcEvents(): void {
    this.ipcServer.listen('VirtualDesktopExtension::GET_GROUPS', async (ipcEvent: IpcEvent) => {
      console.log('VirtualDesktopExtension::GET_GROUPS')
      console.log(this.groups)

      const serializedGroups: VirtualDesktopGroupInfo[] = []

      const data = new IpcData
      data.actionName = 'VirtualDesktopExtension::GET_GROUPS_RESPONSE'
      data.data = { groups: this.groups }
      this.ipcServer.send(data, ipcEvent.event.sender)
    })
  }

  public openWindow(): void {
    if (!this._windowOpen) {
      const win = this.windowsManager.openWindow(winUrl, {
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
  }

}
