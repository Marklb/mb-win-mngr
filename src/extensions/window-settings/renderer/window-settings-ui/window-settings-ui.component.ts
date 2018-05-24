import { Component, OnInit } from '@angular/core'
import { ActivatedRoute } from '@angular/router'
import { ElectronService } from 'app/providers/electron.service'
import { AppWindowService } from 'app/providers/app-window.service'
import { WindowSettingsUiService } from '../window-settings-ui.service'

@Component({
  selector: 'app-window-settings-ui',
  templateUrl: './window-settings-ui.component.html',
  styleUrls: ['./window-settings-ui.component.scss'],
  providers: [
    WindowSettingsUiService
  ]
})
export class WindowSettingsUiComponent implements OnInit {

  constructor(
    public route: ActivatedRoute,
    public electronService: ElectronService,
    public appWindow: AppWindowService,
    public windowSettingsUi: WindowSettingsUiService
  ) {
    this.windowSettingsUi.hWnd$.subscribe(hWnd => {
      this.appWindow.setWindowTitle(`Window Settings - [${hWnd}]`)
    })
  }

  ngOnInit() {
    this.route.paramMap
      .subscribe(params => {
        if (params.has('hWnd')) {
          this.windowSettingsUi.setHwnd(Number(params.get('hWnd')))
        }
      })
  }

}
