import { Observable } from 'rxjs/Observable'
import { Subject } from 'rxjs/Subject'
// import { ipcRenderer } from 'electron'
const { ipcRenderer } = window.require('electron')
import { IpcConstants, IpcData, IpcDataType, IpcAction, IpcEvent, IpcFunc,
  RegisteredIpcAction } from './ipc-common'

export class IpcClient {

  private ipcRenderer: Electron.IpcRenderer = ipcRenderer

  private registeredIpcActions: RegisteredIpcAction = {}

  constructor() {
    this.ipcRenderer.on(IpcConstants.MsgFromServer, this.onIpcEvent.bind(this))
  }

  private onIpcEvent(event, arg: IpcData): void {
    // const wins = BrowserWindow.getAllWindows()
    const actions = this.registeredIpcActions[arg.actionName]
    if (actions !== undefined) {
      for (const action of actions) {
        action({
          event: event,
          data: arg
        } as IpcEvent)
      }
    }
  }

  public listen(actionName: IpcAction, func: IpcFunc) {
    if (this.registeredIpcActions[actionName] === undefined) {
      this.registeredIpcActions[actionName] = []
    }
    this.registeredIpcActions[actionName].push(func)
  }

  send(action: IpcAction, data: any = {}) {
    const ipcData = new IpcData
    ipcData.actionName = action
    ipcData.type = IpcDataType.ElectronRenderer
    ipcData.data = data
    // console.log('IpcClient.send: ', ipcData)
    this.ipcRenderer.send(IpcConstants.MsgFromClient, ipcData)
  }

}
