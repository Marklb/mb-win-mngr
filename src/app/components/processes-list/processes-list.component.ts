import { Component, OnInit, OnDestroy, ChangeDetectorRef,
  Output, EventEmitter } from '@angular/core'
import { Subscription } from 'rxjs'
import { ElectronService } from 'app/providers/electron.service'
import { IpcData, IpcDataType, IpcAction, IpcEvent } from 'shared/ipc'
import { WinApiTypes } from 'core/utilities/win-api-utils'
import { Process } from 'models/process'
import { ActivatedRoute } from '@angular/router'
import { WindowUrls } from 'core/windows-manager-utils'

@Component({
  selector: 'app-processes-list',
  templateUrl: './processes-list.component.html',
  styleUrls: ['./processes-list.component.scss']
})
export class ProcessesListComponent implements OnInit, OnDestroy {

  private processesSubscription: Subscription

  @Output('clickCloseIcon')
  clickCloseIcon: EventEmitter<any> = new EventEmitter<any>()

  @Output('clickProcessRow')
  clickProcessRow: EventEmitter<any> = new EventEmitter<any>()

  private nodesOriginal = []
  private nodes = []

  private isPopout: boolean = false

  constructor(private ref: ChangeDetectorRef,
              private route: ActivatedRoute,
              private electronService: ElectronService) {
    const data = route.snapshot.data
    if (data['popout'] !== undefined && data['popout'] === 'processes-list') {
      this.isPopout = true
    }
  }

  ngOnInit() {
    // this.electronService.refreshProcesses()

    // this.processesSubscription = this.electronService.getProcesses()
    //   .subscribe((processes: Process[]) => {
    //     this.nodes = processes
    //     this.nodesOriginal = processes
    //     this.ref.detectChanges()
    //   })

    this._registerIpcEvents()
    this.electronService.ipcClient.send(IpcAction.GetOpenWindows)
  }

  ngOnDestroy() {
    // this.processesSubscription.unsubscribe()
  }

  private _registerIpcEvents(): void {
    this.electronService.ipcClient.listen(IpcAction.GetOpenWindows, async (ipcEvent: IpcEvent) => {
      // console.log('IpcAction.GetOpenWindows', ipcEvent)
      const windows = ipcEvent.data.data.windows
      this.nodes = windows
      this.nodesOriginal = windows
      this.ref.detectChanges()
    })
  }

  onSearchKeypress(event: any) {
    // console.log('onSearchKeypress')
    // console.log(event)
  }

  onSearchKeydown(event: any) {
    // console.log('onSearchKeydown', this.searchInputValue)
    // console.log(event)
  }

  onSearchKeyup(event: any) {
    // console.log('onSearchKeydown', this.searchInputValue)
    // console.log(event)

    this.nodes = this.nodesOriginal.filter(node => node.title.toLowerCase().indexOf(event.target.value.toLowerCase()) !== -1)
  }

  onTableRowActivate(event: any) {
    // console.log('Clicked', event)
    if (event.type === 'click') {
      if (!this.isPopout) {
        this.clickProcessRow.emit(event)
      } else {
        if (event.type === 'click') {
          this.electronService.ipcClient.send(IpcAction.WindowSelect, {
            hWnd: event.row.hWnd
          })
        }
      }
    }
  }

  onRefreshIconClick(event: any) {
    // this.electronService.refreshProcesses()
    this.electronService.ipcClient.send(IpcAction.GetOpenWindows)
  }

  onCloseIconClick(event: any) {
    if (!this.isPopout) {
      this.clickCloseIcon.emit(event)
    } else {
      this.electronService.electronRemote.getCurrentWindow().close()
    }
  }

}
