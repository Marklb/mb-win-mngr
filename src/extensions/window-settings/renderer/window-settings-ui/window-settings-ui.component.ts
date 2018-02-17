import { Component, OnInit } from '@angular/core'
import { ActivatedRoute } from '@angular/router'
import { ElectronService } from 'app/providers/electron.service'
import { AppWindowService } from 'app/providers/app-window.service'

@Component({
  selector: 'app-window-settings-ui',
  templateUrl: './window-settings-ui.component.html',
  styleUrls: ['./window-settings-ui.component.scss']
})
export class WindowSettingsUiComponent implements OnInit {

  private _name: string

  constructor(private route: ActivatedRoute,
              private electronService: ElectronService,
              private appWindowService: AppWindowService) {
    const params = route.snapshot.params
    if (params['name'] !== undefined) {
      this._name = params['name']
      console.log('name: ', this._name)
      this.appWindowService.setWindowTitle(`Window Settings - [${this._name}]`)
    }
  }

  ngOnInit() {
  }

}
