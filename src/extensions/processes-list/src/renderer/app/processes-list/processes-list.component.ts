import { ChangeDetectorRef, Component, EventEmitter, OnDestroy,
  OnInit, Output } from '@angular/core'
import { Subscription } from 'rxjs'

import { AppWindowService } from '@win-mngr/ui'
import { ElectronService } from '@win-mngr/ui/app/providers/electron.service'

import { IpcAction, IpcData, IpcDataType, IpcEvent } from '@win-mngr/core/ipc'

// import { WinApiTypes } from 'core/utilities/win-api-utils'
// import { Process } from 'models/process'
// import { ActivatedRoute } from '@angular/router'
// import { WindowUrls } from 'core/windows-manager-utils'

@Component({
  selector: 'app-processes-list',
  templateUrl: './processes-list.component.html',
  styleUrls: ['./processes-list.component.scss']
})
export class ProcessesListComponent implements OnInit, OnDestroy {

  private nodesOriginal = []
  private nodes = []

  constructor(
    private ref: ChangeDetectorRef,
    // private route: ActivatedRoute,
    private electronService: ElectronService,
    private appWindowService: AppWindowService
  ) { }

  ngOnInit() {
    this.appWindowService.setWindowTitle('Processes List')

    this._registerIpcEvents()
    this.electronService.ipcClient.send(IpcAction.GetOpenWindows)
  }

  ngOnDestroy() { }

  private _registerIpcEvents(): void {
    this.electronService.ipcClient.listen(IpcAction.GetOpenWindows, async (ipcEvent: IpcEvent) => {
      console.log('IpcAction.GetOpenWindows', ipcEvent)
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
    if (event.type === 'click') {
      // console.log('Clicked', event)
      // this.electronService.ipcClient.send(IpcAction.WindowSelect, {
      //   hWnd: event.row.hWnd
      // })

      this.electronService.triggerAction('window-settings:open-window', {
        hWnd: event.row.hWnd
      })
    }
  }

  onRefreshIconClick(event: any) {
    // this.electronService.refreshProcesses()
    // this.electronService.ipcClient.send(IpcAction.GetOpenWindows)
  }

}
