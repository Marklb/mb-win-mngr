import { IExtension, Extension } from '../../../core/extension-manager/extension'
import { Core } from '../../../core/core'
import { Subscription } from 'rxjs'
import { Hotkey, HotkeyManager } from '../../../core/hotkeys'
import { IpcAction, IpcEvent, IpcData } from '../../../shared/ipc'
import { WinApiTypes } from '../../../core/utilities/win-api-utils'
import { VirtualDesktopGroup } from './virtual-desktop-group'
import { VirtualDesktopGroupInfo } from './virtual-desktop-common'
import { Injector, Inject } from '../../../shared/common/injector'
import { ActionsManager } from '../../../core/actions-manager'
import { WindowsManager } from '../../../core/windows-manager'
import { IpcServer } from '../../../shared/ipc/ipc-server'
import { StoreContainer } from '../../../shared/redux/store/configureStore'
import { Store } from 'redux'
import { addVirtualDesktop, updateVirtualDesktopIndex, setVirtualDesktopState,
  setVirtualDesktopProcess } from '../shared/redux/actions/virtual-desktop'
import { VirtualDesktopActionState } from '../shared/models'
import * as winApi from '@marklb/mb-winapi-node'
import * as winApiUtils from '../../../core/utilities/win-api-utils'
import { extensionsPath, toRouteUrl } from '../../../core/utilities'
const robotjs = require ('robot-js')

const extensionRootPath: string = `${extensionsPath()}/virtual-desktop`

// @Inject
@Extension({})
export class VirtualDesktopExtension implements IExtension {

  extensionId: string = 'virtual-desktop'
  extensionName: string = 'Virtual Desktop'
  extensionConfig: any = {}
  extensionConfigPath: string = `${extensionRootPath}/config/virtual-desktop.config.json`

  private _subscriptions: Subscription[] = []
  private _registeredHotkeys: Hotkey[] = []

  private _windowOpen: boolean = false
  private _windowRef: any

  public groups: VirtualDesktopGroup[] = []

  public winUrl: string = toRouteUrl('extension/virtual-desktop')

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

    // this.store.subscribe(async () => {
    //   // persist store changes
    //   // TODO: should this be blocking / wait? _.throttle?
    //   // await storage.set('state', store.getState());
    //   console.log('VirtualDesktopExtension state: ', this.store.getState())
    // })

    // console.log('this.extensionConfig: ', this.extensionConfig)
    for (const grp of this.extensionConfig.groups) {
      this.store.dispatch(addVirtualDesktop({
        desktopName: grp.groupName,
        processItems: []
      }))
      this.store.dispatch(updateVirtualDesktopIndex())
    }
  }

  ready(): void {

  }

  destroy(): void {

  }

  private _initActions(): void {
    this._subscriptions.push(this.actionsManager
      .registerAction('virtual-desktop:open-stats-window')
      .subscribe(data => {
        this.openWindow()
      }))

    this._subscriptions.push(this.actionsManager
      .registerAction('virtual-desktop:set-action-state-process-select')
      .subscribe(data => {
        this.store.dispatch(
          setVirtualDesktopState(VirtualDesktopActionState.ProcessSelect))
      }))

    this._subscriptions.push(this.actionsManager
      .registerAction('virtual-desktop:set-action-state-disabled')
      .subscribe(data => {
        this.store.dispatch(
          setVirtualDesktopState(VirtualDesktopActionState.Disabled))
      }))

    this._subscriptions.push(this.actionsManager
      .registerAction('virtual-desktop:set-action-state-working')
      .subscribe(data => {
        this.store.dispatch(
          setVirtualDesktopState(VirtualDesktopActionState.Working))
      }))

    // Process Selection/Switching keys
    this._subscriptions.push(this.actionsManager
      .registerAction('virtual-desktop:process-key-1')
      .subscribe(data => {
        this.store.dispatch(
          setVirtualDesktopProcess(1, winApi.user32.GetForegroundWindow()))
      }))

    this._subscriptions.push(this.actionsManager
      .registerAction('virtual-desktop:process-key-2')
      .subscribe(data => {
        this.store.dispatch(
          setVirtualDesktopProcess(2, winApi.user32.GetForegroundWindow()))
      }))

    this._subscriptions.push(this.actionsManager
      .registerAction('virtual-desktop:process-key-3')
      .subscribe(data => {
        this.store.dispatch(
          setVirtualDesktopProcess(3, winApi.user32.GetForegroundWindow()))
      }))

    this._subscriptions.push(this.actionsManager
      .registerAction('virtual-desktop:process-key-4')
      .subscribe(data => {
        this.store.dispatch(
          setVirtualDesktopProcess(4, winApi.user32.GetForegroundWindow()))
      }))

    this._subscriptions.push(this.actionsManager
      .registerAction('virtual-desktop:process-key-5')
      .subscribe(data => {
        this.store.dispatch(
          setVirtualDesktopProcess(5, winApi.user32.GetForegroundWindow()))
      }))

    this._subscriptions.push(this.actionsManager
      .registerAction('virtual-desktop:process-key-6')
      .subscribe(data => {
        this.store.dispatch(
          setVirtualDesktopProcess(6, winApi.user32.GetForegroundWindow()))
      }))

    this._subscriptions.push(this.actionsManager
      .registerAction('virtual-desktop:process-key-7')
      .subscribe(data => {
        this.store.dispatch(
          setVirtualDesktopProcess(7, winApi.user32.GetForegroundWindow()))
      }))

    this._subscriptions.push(this.actionsManager
      .registerAction('virtual-desktop:process-key-8')
      .subscribe(data => {
        this.store.dispatch(
          setVirtualDesktopProcess(8, winApi.user32.GetForegroundWindow()))
      }))

    this._subscriptions.push(this.actionsManager
      .registerAction('virtual-desktop:process-key-9')
      .subscribe(data => {
        this.store.dispatch(
          setVirtualDesktopProcess(9, winApi.user32.GetForegroundWindow()))
      }))
  }

  private _initHotkeys(): void {
    this._registeredHotkeys.push(this.hotkeyManager.registerHotkey({
      accelerator: 'Pause',
      action: 'virtual-desktop:open-stats-window',
      scope: 'global'
    }))

    this._registeredHotkeys.push(this.hotkeyManager.registerHotkey({
      accelerator: 'NumDivide',
      action: 'virtual-desktop:set-action-state-working',
      scope: 'global'
    }))

    this._registeredHotkeys.push(this.hotkeyManager.registerHotkey({
      accelerator: 'NumMultiply',
      action: 'virtual-desktop:set-action-state-disabled',
      scope: 'global'
    }))

    this._registeredHotkeys.push(this.hotkeyManager.registerHotkey({
      accelerator: 'NumMinus',
      action: 'virtual-desktop:set-action-state-process-select',
      scope: 'global'
    }))

    // Process Selection/Switching keys
    this._registeredHotkeys.push(this.hotkeyManager.registerHotkey({
      accelerator: 'Num1',
      action: 'virtual-desktop:process-key-1',
      scope: 'global'
    }))

    this._registeredHotkeys.push(this.hotkeyManager.registerHotkey({
      accelerator: 'Num2',
      action: 'virtual-desktop:process-key-2',
      scope: 'global'
    }))

    this._registeredHotkeys.push(this.hotkeyManager.registerHotkey({
      accelerator: 'Num3',
      action: 'virtual-desktop:process-key-3',
      scope: 'global'
    }))

    this._registeredHotkeys.push(this.hotkeyManager.registerHotkey({
      accelerator: 'Num4',
      action: 'virtual-desktop:process-key-4',
      scope: 'global'
    }))

    this._registeredHotkeys.push(this.hotkeyManager.registerHotkey({
      accelerator: 'Num5',
      action: 'virtual-desktop:process-key-5',
      scope: 'global'
    }))

    this._registeredHotkeys.push(this.hotkeyManager.registerHotkey({
      accelerator: 'Num6',
      action: 'virtual-desktop:process-key-6',
      scope: 'global'
    }))

    this._registeredHotkeys.push(this.hotkeyManager.registerHotkey({
      accelerator: 'Num7',
      action: 'virtual-desktop:process-key-7',
      scope: 'global'
    }))

    this._registeredHotkeys.push(this.hotkeyManager.registerHotkey({
      accelerator: 'Num8',
      action: 'virtual-desktop:process-key-8',
      scope: 'global'
    }))

    this._registeredHotkeys.push(this.hotkeyManager.registerHotkey({
      accelerator: 'Num9',
      action: 'virtual-desktop:process-key-9',
      scope: 'global'
    }))

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
