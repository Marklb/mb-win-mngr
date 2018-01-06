import { Hotkey } from './hotkey'
import { HotkeyConfigItem } from './hotkey-config-item'
import { IpcServer } from '../../shared/ipc/ipc-server'
import { IpcEvent, IpcData, IpcAction, IpcSerializationObj } from '../../shared/ipc'
const fs = require('fs')

export class HotkeyManager {

  public hotkeys: Hotkey[] = []

  constructor(private ipcServer: IpcServer) { }

  public init(): void {
    this._registerIpcEvents()
  }

  private _registerIpcEvents(): void {
    //
    // GetHotkeys
    //
    this.ipcServer.listen(IpcAction.HotkeyManagerGetHotkeys, async (ipcEvent: IpcEvent) => {
      console.log('IpcAction.HotkeyManagerGetHotkeys', ipcEvent)
      const data = new IpcData
      data.actionName = IpcAction.HotkeyManagerGetHotkeys
      data.data = { hotkeys: await this.getIpcSerializedHotkeys() }
      this.ipcServer.send(data, ipcEvent.event.sender)
    })
  }

  public loadConfig(configFileUrl: string): void {
    fs.readFile(configFileUrl, 'utf8', (err, data) => {
      if (err) { throw err }

      const configJson = JSON.parse(data)
      const temp: Hotkey[] = []
      for (const h of configJson.hotkeys) {
        const hk = h as HotkeyConfigItem
        temp.push(new Hotkey(hk.accelerator, hk.action, hk.scope))
      }

      this.hotkeys = temp
    })
  }

  public async getIpcSerializedHotkeys(): Promise<IpcSerializationObj[]> {
    const list: IpcSerializationObj[] = []

    for (const h of this.hotkeys) {
      list.push(h.ipcSerialize().serializedData)
    }

    return list
  }

}
