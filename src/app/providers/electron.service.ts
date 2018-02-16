import { Injectable, NgZone } from '@angular/core'
// import configureStore from 'shared/redux/store/configureStore'
// import { getInitialStateRenderer } from 'electron-redux'

// If you import a module but never use any of the imported values other than as TypeScript types,
// the resulting javascript file will look as if you never imported the module at all.
import { ipcRenderer } from 'electron'
import * as childProcess from 'child_process'

import { Observable } from 'rxjs/Observable'
import { Subject } from 'rxjs/Subject'

import { Process } from 'models/process'
import { WindowData } from 'models/window-data'

import { IpcData, IpcConstants, IpcAction, IpcEvent } from 'shared/ipc'
import { IpcClient } from 'shared/ipc/ipc-client'
import { WinApiTypes } from 'core/utilities/win-api-utils'

@Injectable()
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

  public store: any

  constructor(public zone: NgZone) {
    // Conditional imports
    if (this.isElectron()) {
      const getInitialStateRenderer = window.require('electron-redux').getInitialStateRenderer
      const initialState = getInitialStateRenderer()

      const configureStore = window.require('./core/shared/redux/store/configureStore').default
      this.store = configureStore(initialState, 'renderer')


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

      // this.store.subscribe(async () => {
      //   // persist store changes
      //   // TODO: should this be blocking / wait? _.throttle?
      //   // await storage.set('state', store.getState());
      //   console.log('state: ', this.store.getState())
      // })
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
