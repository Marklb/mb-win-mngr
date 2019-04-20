import { Injectable } from '@angular/core'
import { Process, WindowData } from '@win-mngr/core'
import { IpcAction, IpcEvent } from '@win-mngr/core/ipc'
import { BehaviorSubject, from, Observable, of, Subject } from 'rxjs'
import { switchMap, switchMapTo, take, tap } from 'rxjs/operators'
// import { WindowSettingsUiComponent } from './window-settings-ui/window-settings-ui.component'

import { AppWindowService } from '@win-mngr/ui'
import { ElectronService } from '@win-mngr/ui/app/providers/electron.service'

@Injectable()
export class WindowSettingsUiService {

  private loadingSubject = new BehaviorSubject<boolean>(false)
  private hWndSubject = new BehaviorSubject<number>(undefined)
  private windowDataSubject = new BehaviorSubject<WindowData>(undefined)

  public loading$ = this.loadingSubject.asObservable()
  public hWnd$ = this.hWndSubject.asObservable()
  public windowData$ = this.windowDataSubject.asObservable()

  constructor(
    public electronService: ElectronService,
    private appWindowService: AppWindowService
  ) {
    this.appWindowService.setWindowTitle('Window Settings')
  }

  public async setHwnd(hWnd: number): Promise<void> {
    console.log('setHwnd START')
    this.loadingSubject.next(true)
    this.hWndSubject.next(hWnd)

    const winData = await this._loadWindowData(hWnd)
    console.log('winData', winData)
    if (winData) {
      this.windowDataSubject.next(winData)
    }

    this.loadingSubject.next(false)
    console.log('setHwnd END')
  }

  public reload(): Observable<void> {
    return this.hWnd$
      .pipe(switchMap(hWnd => from(this.setHwnd(hWnd))))
  }

  private async _loadWindowData(hWnd: number) {
    return new Promise<WindowData>((resolve, reject) => {
      const listenFunc = async (ipcEvent: IpcEvent) => {
        console.log('IpcAction.GetWindowData', ipcEvent)
        const winData = ipcEvent.data.data.windowData
        // this.windowData = winData
        // this.processChange.emit(ipcEvent.data.data)
        this.electronService.ipcClient.unlisten(IpcAction.GetWindowData, listenFunc)

        resolve(winData)
      }

      this.electronService.ipcClient.listen(IpcAction.GetWindowData, listenFunc)

      this.electronService.ipcClient.send(IpcAction.GetWindowData, { hWnd: hWnd })
    })
  }

  public setAppUserModelId(id: string): Observable<void> {
    return this.hWnd$
      .pipe(take(1))
      .pipe(tap(hWnd => console.log('hWnd', hWnd)))
      .pipe(switchMap(hWnd =>
        from(this.electronService.ipcClient.asyncSend('ext:setAppUserModelId', {
          hWnd: hWnd,
          appUserModelId: id
        })
      )))
      .pipe(tap(_ => this.reload()))
  }

}
