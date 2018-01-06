import { Component, OnInit, Input } from '@angular/core';
import { HotkeyInfo } from 'core/hotkeys/hotkey-info'

@Component({
  selector: 'app-hotkey-panel',
  templateUrl: './hotkey-panel.component.html',
  styleUrls: ['./hotkey-panel.component.scss']
})
export class HotkeyPanelComponent implements OnInit {

  @Input('hotkey') private hotkey: HotkeyInfo

  constructor() { }

  ngOnInit() {
  }

  public setHotkey(hk: HotkeyInfo): void {
    this.hotkey = hk
  }

}
