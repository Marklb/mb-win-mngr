import { Component, Input, OnInit } from '@angular/core'
import { IpcAction, IpcEvent } from '@win-mngr/core/ipc'
import { ElectronService } from '@win-mngr/ui'
import { WindowSettingsUiService } from '../window-settings-ui.service'

@Component({
  selector: 'app-app-user-model-id-input',
  templateUrl: './app-user-model-id-input.component.html',
  styleUrls: ['./app-user-model-id-input.component.scss']
})
export class AppUserModelIdInputComponent implements OnInit {

  _appUserModelIdInput = ''

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
