import { IpcConstants, IpcData, IpcFunc, IpcAction, IpcEvent, IpcDataType,
  RegisteredIpcAction } from './ipc-common'
import { Observable } from 'rxjs/Observable'
import { Subject } from 'rxjs/Subject'
import { ipcMain, BrowserWindow } from 'electron'

export class IpcServer {

  private ipcMain: typeof ipcMain = ipcMain

  private registeredIpcActions: RegisteredIpcAction = {}

  constructor() {
    // console.log('IpcServer')
    this.ipcMain.on(IpcConstants.MsgFromClient, this.onIpcEvent.bind(this))
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

  public send(data: IpcData, win: BrowserWindow = undefined) {
    if (data.type === undefined) {
      data.type = IpcDataType.ElectronMain
    }
    // this.ipcMain.send(`ipc:::${IpcConstants.MsgFromServer}`, {filter: 'test'})
    if (win !== undefined) {
      win.webContents.send(IpcConstants.MsgFromServer, data)
    }
  }

  // send(action: IpcAction, data: any = {}) {
  //   const ipcData = new IpcData
  //   ipcData.actionName = action
  //   ipcData.type = IpcDataType.ElectronRenderer
  //   ipcData.data = data
  //   console.log('IpcClient.send: ', ipcData)
  //   this.ipcRenderer.send(IpcConstants.MsgFromClient, ipcData)
  // }

}
