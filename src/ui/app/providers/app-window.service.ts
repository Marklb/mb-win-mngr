import { Injectable } from '@angular/core'
import { merge, Observable, of, ReplaySubject, Subject } from 'rxjs'

import * as childProcess from 'child_process'
import { ipcRenderer } from 'electron'
import { map, mapTo, startWith } from 'rxjs/operators'

@Injectable({ providedIn: 'root' })
export class AppWindowService {

  public childProcess: typeof childProcess
  public ipcRenderer: typeof Electron.ipcRenderer
  public electronRemote: Electron.Remote

  private windowTitleSubscription = new ReplaySubject<string>(1)

  public isMaximized$: Observable<boolean>

  constructor() {
    if (this.isElectron()) {
      this.ipcRenderer = window.require('electron').ipcRenderer
      this.childProcess = window.require('child_process')
      this.electronRemote = window.require('electron').remote

      this.isMaximized$ = merge(
          this.observeWindowEvent('unmaximize').pipe(mapTo(false)),
          this.observeWindowEvent('maximize').pipe(mapTo(true)),
          of(this.currentWindow()).pipe(map(win => win.isMaximized()))
        )
    }
  }

  public isElectron = () => {
    return window && window.process && window.process.type
  }

  /**
   * Window title.
   */
  public windowTitle(): Observable<string> {
    return this.windowTitleSubscription.asObservable()
  }

  /**
   * Set window title.
   */
  public setWindowTitle(title: string): void {
    return this.windowTitleSubscription.next(title)
  }

  /**
   * Get the current electron window.
   */
  public currentWindow(): Electron.BrowserWindow {
    return this.electronRemote.getCurrentWindow()
  }

  /**
   * Observe a BrowserWindow event
   */
  public observeWindowEvent(
    eventName: string,
    window: Electron.BrowserWindow = this.currentWindow()
  ): Observable<Electron.Event> {
    return new Observable(subscriber => {
      window.on(<any>eventName, (event: Electron.Event) => {
        subscriber.next(event)
      })
    })
  }

}
