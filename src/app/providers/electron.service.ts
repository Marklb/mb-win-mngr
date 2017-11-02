import { Injectable } from '@angular/core'

// If you import a module but never use any of the imported values other than as TypeScript types,
// the resulting javascript file will look as if you never imported the module at all.
import { ipcRenderer } from 'electron'
import * as childProcess from 'child_process'

import { Observable } from 'rxjs/Observable'
import { Subject } from 'rxjs/Subject'

import { Process } from '../../models/process'

@Injectable()
export class ElectronService {

  ipcRenderer: typeof ipcRenderer
  childProcess: typeof childProcess

  private processesSubject = new Subject<Process[]>();

  constructor() {
    // Conditional imports
    if (this.isElectron()) {
      this.ipcRenderer = window.require('electron').ipcRenderer
      this.childProcess = window.require('child_process')

      this.ipcRenderer.on('winapi:getProcessesReply', (event, arg) => {
        console.log(arg) // prints "pong"
        this.processesSubject.next(arg)
      })
    }

  }

  isElectron = () => {
    return window && window.process && window.process.type
  }

  getProcesses(): Observable<Process[]> {
    this.ipcRenderer.send('winapi:getProcesses', {filter: 'test'})

    this.ipcRenderer.send('winapi:test', {})

    return this.processesSubject.asObservable()
  }

}
