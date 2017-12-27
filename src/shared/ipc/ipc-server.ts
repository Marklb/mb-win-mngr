import { IpcConstants, IpcData } from './ipc-common'
import { Observable } from 'rxjs/Observable'
import { Subject } from 'rxjs/Subject'
import { ipcMain } from 'electron'

export class IpcServer {

  private ipcMain: typeof ipcMain

  private sub = new Subject<IpcData>()

  constructor() {
    // this.ipcMain.on('winapi:getProcessesReply', (event, arg) => {
    //   this.processesSubject.next(arg)
    // })
  }

  send(data: IpcData) {
    // this.ipcMain.send(`ipc:::${IpcConstants.MsgFromServer}`, {filter: 'test'})
  }

}
