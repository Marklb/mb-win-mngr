import { Component, OnInit, Input } from '@angular/core'
import { ElectronService } from 'app/providers/electron.service'
import { IpcEvent, IpcAction } from 'shared/ipc'
import { WindowSettingsUiService } from '../window-settings-ui.service'

@Component({
  selector: 'app-app-user-model-id-input',
  templateUrl: './app-user-model-id-input.component.html',
  styleUrls: ['./app-user-model-id-input.component.scss']
})
export class AppUserModelIdInputComponent implements OnInit {

  _appUserModelIdInput: string = ''

  @Input()
  set appUserModelIdInput(val: string) {
    this._appUserModelIdInput = val
  }
  get appUserModelIdInput() {
    return this._appUserModelIdInput
  }

  @Input() hWnd: number

  constructor(
    public electronService: ElectronService,
    public windowSettingsUi: WindowSettingsUiService,
  ) { }

  ngOnInit() {
  }

  onClickAppUserModelIdSetBtn(event: any) {
    this.windowSettingsUi.setAppUserModelId(this.appUserModelIdInput)
      .subscribe(_ => console.log('onClickAppUserModelIdSetBtn done'))
  }

}
