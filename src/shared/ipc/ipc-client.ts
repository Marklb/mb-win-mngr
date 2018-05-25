import { Injectable, NgZone } from '@angular/core'
import { Observable, Subject } from 'rxjs'
// import { ipcRenderer } from 'electron'
const { ipcRenderer } = window.require('electron')
import { IpcConstants, IpcData, IpcDataType, IpcAction, IpcEvent, IpcFunc,
  RegisteredIpcAction } from './ipc-common'

export class IpcClient {

  private ipcRenderer: Electron.IpcRenderer = ipcRenderer

  private registeredIpcActions: RegisteredIpcAction = {}

  constructor(private zone: NgZone) {
    this.ipcRenderer.on(IpcConstants.MsgFromServer, this.onIpcEvent.bind(this))
  }

  private onIpcEvent(event, arg: IpcData): void {
    // const wins = BrowserWindow.getAllWindows()
    const actions = this.registeredIpcActions[arg.actionName]
    if (actions !== undefined) {
      for (const action of actions) {
        // setTimeout(() => {
        //   action({
        //     event: event,
        //     data: arg
        //   } as IpcEvent)
        // })
        this.zone.run(() => {
          action({
            event: event,
            data: arg
          } as IpcEvent)
        })
      }
    }
  }

  public listen(actionName: IpcAction | string, func: IpcFunc) {
    if (this.registeredIpcActions[actionName] === undefined) {
      this.registeredIpcActions[actionName] = []
    }
    this.registeredIpcActions[actionName].push(func)
  }

  public unlisten(actionName: IpcAction | string, func: IpcFunc) {
    if (this.registeredIpcActions[actionName] === undefined) {
      this.registeredIpcActions[actionName] = []
    }
    this.registeredIpcActions[actionName] =
      this.registeredIpcActions[actionName].filter(f => f !== func)
  }

  public send(action: IpcAction | string, data: any = {}) {
    const ipcData = new IpcData
    ipcData.actionName = action
    ipcData.type = IpcDataType.ElectronRenderer
    ipcData.data = data
    // console.log('IpcClient.send: ', ipcData)
    this.ipcRenderer.send(IpcConstants.MsgFromClient, ipcData)
  }

  public async asyncSend(action: IpcAction | string, data: any = {}): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      const listenFunc = async (ipcEvent: IpcEvent) => {
        this.unlisten(action, listenFunc)
        resolve(ipcEvent)
      }

      this.listen(action, listenFunc)

      this.send(action, data)
    })
  }

}
