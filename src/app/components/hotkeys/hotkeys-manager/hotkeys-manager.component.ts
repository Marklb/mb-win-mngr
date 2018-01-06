import { Component, OnInit } from '@angular/core'
import { ElectronService } from 'app/providers/electron.service'
import { IpcData, IpcDataType, IpcAction, IpcEvent } from 'shared/ipc'
import { HotkeyInfo } from 'core/hotkeys/hotkey-info'

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

}
