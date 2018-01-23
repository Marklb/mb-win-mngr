import { Component, OnInit, Input } from '@angular/core'
import { HotkeyInfo } from 'core/hotkeys/hotkey-info'
import { ElectronService } from 'app/providers/electron.service'
import { IpcData, IpcDataType, IpcAction, IpcEvent } from 'shared/ipc'

@Component({
  selector: 'app-hotkey-panel',
  templateUrl: './hotkey-panel.component.html',
  styleUrls: ['./hotkey-panel.component.scss']
})
export class HotkeyPanelComponent implements OnInit {

  @Input('hotkey') private hotkey: HotkeyInfo

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
