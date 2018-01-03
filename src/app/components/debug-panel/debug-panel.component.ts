import { Component, OnInit } from '@angular/core'
import { ElectronService } from 'app/providers/electron.service'
import { IpcData, IpcDataType, IpcAction, IpcEvent } from 'shared/ipc'
import { WinApiTypes } from 'core/utilities/win-api-utils'

@Component({
  selector: 'app-debug-panel',
  templateUrl: './debug-panel.component.html',
  styleUrls: ['./debug-panel.component.scss']
})
export class DebugPanelComponent implements OnInit {

  private windows: WinApiTypes.Window

  constructor(private electronService: ElectronService) { }

  ngOnInit() {
    this._registerIpcEvents()
    this.electronService.ipcClient.send(IpcAction.GetOpenWindows)
  }

  private _registerIpcEvents(): void {
    this.electronService.ipcClient.listen(IpcAction.GetOpenWindows, async (ipcEvent: IpcEvent) => {
      console.log('IpcAction.GetOpenWindows', ipcEvent)
      this.windows = ipcEvent.data.windows
    })
  }

}
