import { Hotkey } from './hotkey'
import { HotkeyConfigItem } from './hotkey-config-item'
import { IpcServer } from '../../shared/ipc/ipc-server'
import { IpcEvent, IpcData, IpcAction, IpcSerializationObj } from '../../shared/ipc'
import { ActionsManager } from '../actions-manager'
import { MBHotkeys, MBHotkeyEvent, MBHotkeysEnums, MBHotkeysConstants } from 'mb-hotkeys'
import { fork } from 'child_process'
const fs = require('fs')

export class HotkeyManager {

  public hotkeys: Hotkey[] = []
  // public mbHotkeys: MBHotkeys = new MBHotkeys()
  private _forkedMBHotkeyProcess: any

  constructor(private ipcServer: IpcServer,
              private actionsManager: ActionsManager) { }

  /**
   *
   */
  public init(): void {
    this._registerIpcEvents()
    // console.log('_startListeningTask')
    // this.mbHotkeys.startListening()

    this._forkedMBHotkeyProcess = fork('./dist/core/core/hotkeys/mb-hotkeys-process.js')

    this._forkedMBHotkeyProcess.on('message', (msg) => {
      // console.log('Message from child', msg)
      if (msg.type === 'action') {
        this.actionsManager.triggerAction(msg.payload.action)
      }
    })

    // this._forkedMBHotkeyProcess.send({ hello: 'world' })
    // this._forkedMBHotkeyProcess.send({ type: 'start_listening' })

    // console.log('_startListeningTask')
  }

  /**
   *
   */
  private _registerIpcEvents(): void {
    //
    // GetHotkeys
    //
    this.ipcServer.listen(IpcAction.HotkeyManagerGetHotkeys, async (ipcEvent: IpcEvent) => {
      // console.log('IpcAction.HotkeyManagerGetHotkeys', ipcEvent)
      const data = new IpcData
      data.actionName = IpcAction.HotkeyManagerGetHotkeys
      data.data = { hotkeys: await this.getIpcSerializedHotkeys() }
      this.ipcServer.send(data, ipcEvent.event.sender)
    })

    //
    // AttemptAction
    //
    this.ipcServer.listen(IpcAction.HotkeyManagerAttemptAction, async (ipcEvent: IpcEvent) => {
      // console.log('IpcAction.HotkeyManagerAttemptAction', ipcEvent)
      const evtData = ipcEvent.data.data
      // console.log('AttemptAction: ', evtData)
      this.actionsManager.triggerAction(evtData.action)
    })
  }

  /**
   *
   * @param configFileUrl
   */
  public loadConfig(configFileUrl: string): Promise<any> {
    return new Promise((resolve, reject) => {
      fs.readFile(configFileUrl, 'utf8', (err, data) => {
        // if (err) { throw err }
        if (err) { reject(err) }

        const configJson = JSON.parse(data)
        const temp: Hotkey[] = []
        for (const h of configJson.hotkeys) {
          const hkci = h as HotkeyConfigItem
          const hk = new Hotkey(hkci.accelerator, hkci.action, hkci.scope)
          hk.active = true
          // this.mbHotkeys.registerSequence(hkci.accelerator, (event: MBHotkeyEvent) => {
          //   console.log(`-== [${hkci.accelerator}] ==-`)
          //   console.log('event', event)
          // })
          this._forkedMBHotkeyProcess.send({
            type: 'register_hotkey',
            accelerator: hkci.accelerator,
            action: hkci.action
          })
          temp.push(hk)
        }

        this.hotkeys = temp

        resolve()
      })
    })
  }

  public startListening(): void {
    this._forkedMBHotkeyProcess.send({ type: 'start_listening' })
  }

  public stopListening(): void {
    this._forkedMBHotkeyProcess.send({ type: 'stop_listening' })
  }

  /**
   *
   */
  public async getIpcSerializedHotkeys(): Promise<IpcSerializationObj[]> {
    const list: IpcSerializationObj[] = []

    for (const h of this.hotkeys) {
      list.push(h.ipcSerialize().serializedData)
    }

    return list
  }

}
