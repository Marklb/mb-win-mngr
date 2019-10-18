import { ChangeDetectorRef, Component, EventEmitter, OnDestroy,
  OnInit, Output } from '@angular/core'
import { interval, Observable, Subscription } from 'rxjs'

import { AppWindowService } from '@win-mngr/ui'
import { ElectronService } from '@win-mngr/ui/app/providers/electron.service'

import { IpcAction, IpcData, IpcDataType, IpcEvent } from '@win-mngr/core/ipc'
import { map, shareReplay, tap } from 'rxjs/operators'


@Component({
  selector: 'app-virtual-desktop',
  templateUrl: './virtual-desktop.component.html',
  styleUrls: ['./virtual-desktop.component.scss']
})
export class VirtualDesktopComponent implements OnInit, OnDestroy {

  currentProcess$: Observable<string>

  _tick = interval(1000).pipe(shareReplay(1))

  constructor(
    private ref: ChangeDetectorRef,
    // private route: ActivatedRoute,
    private electronService: ElectronService,
    private appWindowService: AppWindowService
  ) { }

  ngOnInit() {
    this.appWindowService.setWindowTitle('Virtual Desktop')

    // this._tick
    //   .pipe(tap(v => console.log('tick v', v)))
    //   .subscribe(_ => this.electronService.ipcClient.send('IPC::VIRTUAL_DESKTOP:ACTIVE_HWND'))
    // this.electronService.ipcClient.send('IPC::VIRTUAL_DESKTOP:ACTIVE_HWND')

    this.currentProcess$ = this.electronService.ipcClient.select('IPC::VIRTUAL_DESKTOP:ACTIVE_HWND')
      .pipe(map(ipcEvent => ipcEvent.data.data.active_hwnd))
  }

  ngOnDestroy() { }

}


// this.electronService.triggerAction('window-settings:open-window', {
//   hWnd: event.row.hWnd
// })
