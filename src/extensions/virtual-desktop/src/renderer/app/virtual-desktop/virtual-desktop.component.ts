import { ChangeDetectorRef, Component, EventEmitter, OnDestroy,
  OnInit, Output } from '@angular/core'
import { interval, Subscription } from 'rxjs'

import { AppWindowService } from '@win-mngr/ui'
import { ElectronService } from '@win-mngr/ui/app/providers/electron.service'

import { IpcAction, IpcData, IpcDataType, IpcEvent } from '@win-mngr/core/ipc'
import { shareReplay, tap } from 'rxjs/operators'


@Component({
  selector: 'app-virtual-desktop',
  templateUrl: './virtual-desktop.component.html',
  styleUrls: ['./virtual-desktop.component.scss']
})
export class VirtualDesktopComponent implements OnInit, OnDestroy {

  currentProcess: string

  _tick = interval(1000).pipe(shareReplay(1))

  constructor(
    private ref: ChangeDetectorRef,
    // private route: ActivatedRoute,
    private electronService: ElectronService,
    private appWindowService: AppWindowService
  ) { }

  ngOnInit() {
    this.appWindowService.setWindowTitle('Virtual Desktop')

    this._registerIpcEvents()

    this._tick
      .pipe(tap(v => console.log('tick v', v)))
      .subscribe(_ => this.electronService.ipcClient.send('IPC::VIRTUAL_DESKTOP:ACTIVE_HWND'))
    // this.electronService.ipcClient.send('IPC::VIRTUAL_DESKTOP:ACTIVE_HWND')
  }

  ngOnDestroy() { }

  private _registerIpcEvents(): void {
    this.electronService.ipcClient.listen('IPC::VIRTUAL_DESKTOP:ACTIVE_HWND', async (ipcEvent: IpcEvent) => {
      console.log('IPC::VIRTUAL_DESKTOP:ACTIVE_HWND', ipcEvent)
      this.currentProcess = ipcEvent.data.data.active_hwnd
      // const windows = ipcEvent.data.data.windows
      // this.nodes = windows
      // this.nodesOriginal = windows
      this.ref.detectChanges()
    })
  }

}


// this.electronService.triggerAction('window-settings:open-window', {
//   hWnd: event.row.hWnd
// })
