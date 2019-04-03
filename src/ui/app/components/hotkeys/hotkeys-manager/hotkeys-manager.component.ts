import { Component, OnInit } from '@angular/core'
import { HotkeyInfo } from '@win-mngr/core/hotkeys/hotkey-info'
import { IpcAction, IpcData, IpcDataType, IpcEvent } from '@win-mngr/core/ipc'
import { ElectronService } from '../../../providers/electron.service'

@Component({
  selector: 'app-hotkeys-manager',
  templateUrl: './hotkeys-manager.component.html',
  styleUrls: ['./hotkeys-manager.component.scss']
})
export class HotkeysManagerComponent implements OnInit {

  private hotkeys: HotkeyInfo[] = []

  constructor(private electronService: ElectronService) { }

  ngOnInit() {
    this._registerIpcEvents()
    this.electronService.ipcClient.send(IpcAction.HotkeyManagerGetHotkeys)
  }

  private _registerIpcEvents(): void {
    this.electronService.ipcClient.listen(IpcAction.HotkeyManagerGetHotkeys, async (ipcEvent: IpcEvent) => {
      console.log('IpcAction.HotkeyManagerGetHotkeys', ipcEvent)
      console.log(ipcEvent.data.data.hotkeys)
      this.hotkeys = [...ipcEvent.data.data.hotkeys]
    })
  }

  private onSearchKeypress(event: any): void {

  }

  private onSearchKeydown(event: any): void {

  }

  private onSearchKeyup(event: any): void {

  }


}
