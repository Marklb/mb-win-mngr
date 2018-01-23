import { IpcSerializable, IpcSerializationObj } from '../../shared/ipc/ipc-common'
import { HotkeyInfo } from './hotkey-info'

export class Hotkey implements IpcSerializable {

  private _active: boolean

  constructor(public accelerator: string,
              public action: string,
              public scope?: string) { }

  /**
   *
   */
  public get active() {
    return this._active
  }

  /**
   *
   */
  public set active(val: boolean) {
    this._active = val
  }

  /**
   *
   */
  public ipcSerialize(): IpcSerializationObj {
    const s = new IpcSerializationObj
    const hkInfo = new HotkeyInfo
    hkInfo.accelerator = this.accelerator
    hkInfo.action = this.action
    hkInfo.scope = this.scope
    hkInfo.active = this.active
    s.serializedData = hkInfo
    return s
  }

}
