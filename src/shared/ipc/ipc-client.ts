import { IpcConstants, IpcData } from './ipc-common'
import { Observable } from 'rxjs/Observable'
import { Subject } from 'rxjs/Subject'
import { ipcRenderer } from 'electron'

export class IpcClient {

  private ipcRenderer: typeof ipcRenderer

  private sub = new Subject<IpcData>()

  constructor() {
    // this.ipcRenderer.on('winapi:getProcessesReply', (event, arg) => {
    //   this.processesSubject.next(arg)
    // })
  }

  send(data: IpcData) {
    this.ipcRenderer.send('winapi:getProcesses', {filter: 'test'})
  }

}
