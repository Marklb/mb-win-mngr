import { Injectable, NgZone } from '@angular/core'

// If you import a module but never use any of the imported values other than as TypeScript types,
// the resulting javascript file will look as if you never imported the module at all.
import { ipcRenderer } from 'electron'

import * as childProcess from 'child_process'

import { Observable, Subject } from 'rxjs'

import { Process } from '@win-mngr/core/models/process'
import { WindowData } from '@win-mngr/core/models/window-data'

import { IpcAction, IpcConstants, IpcData, IpcEvent } from '@win-mngr/core/ipc/index'
import { IpcClient } from '@win-mngr/core/ipc/ipc-client'
import { WinApiTypes } from '@win-mngr/core/utilities/win-api-utils'

@Injectable({ providedIn: 'root' })
export class ElectronService {

  // public ipcRenderer: typeof ipcRenderer
  public childProcess: typeof childProcess
  public ipcRenderer: typeof Electron.ipcRenderer
  // public childProcess: typeof childProcess
  public electronRemote: Electron.Remote

  private processesSubject = new Subject<Process[]>()
  private selectedProcess = new Subject<Process>()
  private appUserModelIIDProcess = new Subject<string>()
  private windowsSubject = new Subject<WinApiTypes.Window[]>()

  public ipcClient: IpcClient

  constructor(public zone: NgZone) {
    // Conditional imports
    if (this.isElectron()) {
      this.ipcRenderer = window.require('electron').ipcRenderer
      this.childProcess = window.require('child_process')
      this.electronRemote = window.require('electron').remote

      this.ipcClient = new IpcClient(zone)

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

  public triggerAction(identifier: string, data?: any): void {
    this.ipcClient.send(IpcAction.ActionsManagerTriggerAction, {
      identifier: identifier,
      data: data
    })
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

  public async getWindowData(hWnd: number): Promise<WindowData> {
    this.ipcRenderer.send('winapi:getWindowData', { hWnd: hWnd })
    return new Promise<WindowData>((resolve: any, reject: any) => {
      this.ipcRenderer.once('winapi:reply:once:getWindowData', (event: any, arg: any) => {
        resolve(arg)
      })
    })
  }

  public getWindows(): Observable<WinApiTypes.Window[]> {
    return this.windowsSubject.asObservable()
  }

  public refreshWindows(): void {
    this.ipcClient.send(IpcAction.GetOpenWindows)
  }

}
