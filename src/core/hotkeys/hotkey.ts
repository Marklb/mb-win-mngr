import { IpcSerializable, IpcSerializationObj } from '../../shared/ipc/ipc-common'
import { HotkeyInfo } from './hotkey-info'

export class Hotkey implements IpcSerializable {

  constructor(public accelerator: string,
              public action: string,
              public scope?: string) { }

  public ipcSerialize(): IpcSerializationObj {
    const s = new IpcSerializationObj
    const hkInfo = new HotkeyInfo
    hkInfo.accelerator = this.accelerator
    hkInfo.action = this.action
    hkInfo.scope = this.scope
    s.serializedData = hkInfo
    return s
  }

}
