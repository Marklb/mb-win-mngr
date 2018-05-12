import { Injectable } from '@angular/core'
import { Subject, Observable } from 'rxjs'

import { ipcRenderer } from 'electron'
import * as childProcess from 'child_process'

@Injectable()
export class AppWindowService {

  public childProcess: typeof childProcess
  public ipcRenderer: typeof Electron.ipcRenderer
  public electronRemote: Electron.Remote

  private windowTitleSubscription = new Subject<string>()

  constructor() {
    if (this.isElectron()) {
      this.ipcRenderer = window.require('electron').ipcRenderer
      this.childProcess = window.require('child_process')
      this.electronRemote = window.require('electron').remote
    }
  }

  public isElectron = () => {
    return window && window.process && window.process.type
  }

  /**
   * Window title
   */
  public windowTitle(): Observable<string> {
    return this.windowTitleSubscription.asObservable()
  }

  /**
   * Set window title
   */
  public setWindowTitle(title: string): void {
    return this.windowTitleSubscription.next(title)
  }

  /**
   * Close the current electron window
   */
  public closeWindow(): void {
    this.electronRemote.getCurrentWindow().close()
  }

}
