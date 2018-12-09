import { IExtension, Extension } from '../../../core/extension-manager/extension'
import { Core } from '../../../core/core'
import { Subscription } from 'rxjs'
import { Hotkey, HotkeyManager } from '../../../core/hotkeys'
import { ActionsManager } from '../../../core/actions-manager'
import { WindowsManager } from '../../../core/windows-manager/windows-manager'
import { toRouteUrl, extensionsPath } from '../../../core/utilities'

const extensionRootPath: string = `${extensionsPath()}/window-presets`

@Extension({})
export class WindowPresetsExtension implements IExtension {

  extensionId: string = 'window-presets'
  extensionName: string = 'Window presets'
  extensionConfig: any = {}
  extensionConfigPath: string = `${extensionRootPath}/config/window-presets.config.json`

  private _subscriptions: Subscription[] = []
  private _registeredHotkeys: Hotkey[] = []

  private _windowRef: Electron.BrowserWindow
  private _windowOpen: boolean = false

  public winUrl: string = toRouteUrl('extension/window-presets')

  constructor(
    public actionsManager: ActionsManager,
    public windowsManager: WindowsManager,
    public hotkeyManager: HotkeyManager,
  ) { }

  initialize(): void {

  }

  ready(): void {

  }

  destroy(): void {

  }

}
