import { Component, OnInit } from '@angular/core'
import { ActivatedRoute } from '@angular/router'
import { ElectronService } from 'app/providers/electron.service'
import { AppWindowService } from 'app/providers/app-window.service'

@Component({
  selector: 'app-window-settings-base',
  templateUrl: './window-settings-base.component.html',
  styleUrls: ['./window-settings-base.component.scss']
})
export class WindowSettingsBaseComponent implements OnInit {

  private hWnd: number

  constructor(private route: ActivatedRoute,
              private electronService: ElectronService,
              private appWindowService: AppWindowService) {
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

  onProcessChange(event: any) {
    // console.log('onProcessChange: ', event)
    const winData = event.windowData
    const title = `[${winData.pid}] ${winData.title}`
    // console.log(title)
    this.appWindowService.setWindowTitle(title)
  }

}
