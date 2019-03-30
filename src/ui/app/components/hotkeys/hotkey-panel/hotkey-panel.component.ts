import { Component, OnInit, Input } from '@angular/core'
import { HotkeyInfo } from '@win-mngr/core/hotkeys/hotkey-info'
import { ElectronService } from '@win-mngr/ui/app/providers/electron.service'
import { IpcData, IpcDataType, IpcAction, IpcEvent } from '@win-mngr/core/ipc/index'

@Component({
  selector: 'app-hotkey-panel',
  templateUrl: './hotkey-panel.component.html',
  styleUrls: ['./hotkey-panel.component.scss']
})
export class HotkeyPanelComponent implements OnInit {

  @Input() private hotkey: HotkeyInfo

  constructor(private electronService: ElectronService) { }

  ngOnInit() {
  }

  public setHotkey(hk: HotkeyInfo): void {
    this.hotkey = hk
  }

  public onClickActionPlay(event: any): void {
    console.log('PlayAction')
    this.electronService.ipcClient.send(IpcAction.HotkeyManagerAttemptAction, this.hotkey)
  }

}
