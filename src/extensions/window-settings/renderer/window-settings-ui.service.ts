import { Injectable } from '@angular/core'
import { ElectronService } from 'app/providers/electron.service'
import { WindowSettingsUiComponent } from './window-settings-ui/window-settings-ui.component'
import { Subject, BehaviorSubject } from 'rxjs'
import { IpcAction, IpcEvent } from 'shared/ipc'
import { Process } from 'models/process'
import { WindowData } from 'models/window-data'

@Injectable()
export class WindowSettingsUiService {

  private loadingSubject = new BehaviorSubject<boolean>(false)
  private hWndSubject = new BehaviorSubject<number>(undefined)
  private windowDataSubject = new BehaviorSubject<WindowData>(undefined)

  public loading$ = this.loadingSubject.asObservable()
  public hWnd$ = this.hWndSubject.asObservable()
  public windowData$ = this.windowDataSubject.asObservable()

  constructor(
    public electronService: ElectronService
  ) { }

  /**
   *
   * @param hWnd
   */
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

}
