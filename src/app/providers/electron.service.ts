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

  private ipcRenderer: typeof ipcRenderer
  private childProcess: typeof childProcess

  private processesSubject = new Subject<Process[]>()
  private selectedProcess = new Subject<Process>()
  private appUserModelIIDProcess = new Subject<string>()

  constructor() {
    // Conditional imports
    if (this.isElectron()) {
      this.ipcRenderer = window.require('electron').ipcRenderer
      this.childProcess = window.require('child_process')

      this.ipcRenderer.on('winapi:getProcessesReply', (event, arg) => {
        this.processesSubject.next(arg)
      })

      this.ipcRenderer.on('winapi:getAppUserModelIIDReply', (event, arg) => {
        this.appUserModelIIDProcess.next(arg)
      })

      this.ipcRenderer.on('winapi:setAppUserModelIIDReply', (event, arg) => {
        // this.appUserModelIIDProcess.next(arg)
      })
    }

  }

  public isElectron = () => {
    return window && window.process && window.process.type
  }

  public refreshProcesses(): void {
    this.ipcRenderer.send('winapi:getProcesses', {filter: 'test'})
  }

  public getProcesses(): Observable<Process[]> {
    return this.processesSubject.asObservable()
  }

  public getSelectedProcess(): Observable<Process | undefined> {
    return this.selectedProcess.asObservable()
  }

  public setSelectedProcess(process?: Process): void {
    this.selectedProcess.next(process)
  }

  public refreshAppUserModelIID(hWnd: number): void {
    this.ipcRenderer.send('winapi:getAppUserModelIID', { hWnd: hWnd })
  }

  public getAppUserModelIID(): Observable<string> {
    return this.appUserModelIIDProcess.asObservable()
  }

  public setAppUserModelIID(hWnd: number, appUserModelIID: string): void {
    this.appUserModelIIDProcess.next(appUserModelIID)
    this.ipcRenderer.send('winapi:setAppUserModelIID', { hWnd: hWnd,
      appUserModelIID: appUserModelIID })
  }

  public async getWindow(hWnd: number): Promise<any> {
    this.ipcRenderer.send('winapi:getWindow', { hWnd: hWnd })
  }

}
