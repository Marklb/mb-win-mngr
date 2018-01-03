import { Component, OnInit } from '@angular/core'
import { ActivatedRoute } from '@angular/router'
import { ElectronService } from 'app/providers/electron.service'

@Component({
  selector: 'app-window-settings-base',
  templateUrl: './window-settings-base.component.html',
  styleUrls: ['./window-settings-base.component.scss']
})
export class WindowSettingsBaseComponent implements OnInit {

  private hWnd: number

  constructor(private route: ActivatedRoute,
              private electronService: ElectronService) {
    const params = route.snapshot.params
    if (params['hWnd'] !== undefined) {
      this.hWnd = params['hWnd']
      console.log('hWnd: ', this.hWnd)
    }
  }

  ngOnInit() {

  }

  onClickCloseIcon() {
    this.electronService.electronRemote.getCurrentWindow().close()
  }

}
