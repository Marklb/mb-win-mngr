import { Component, OnInit } from '@angular/core'
import { Observable } from 'rxjs'

import { AppWindowService } from '../../providers/app-window.service'

@Component({
  selector: 'mbwm-window-title-bar',
  templateUrl: './window-title-bar.component.html',
  styleUrls: ['./window-title-bar.component.scss']
})
export class WindowTitleBarComponent implements OnInit {

  public title$: Observable<string>
  public isMaximized$: Observable<boolean>

  constructor(
    private appWindowService: AppWindowService
  ) { }

  ngOnInit() {
    this.title$ = this.appWindowService.windowTitle()

    this.isMaximized$ = this.appWindowService.isMaximized$
  }

  public onMinimizeIconClick(event: any) {
    this.appWindowService.currentWindow().minimize()
  }

  public onMaximizeIconClick(event: any) {
    this.appWindowService.currentWindow().maximize()
  }

  public onUnmaximizeIconClick(event: any) {
    this.appWindowService.currentWindow().unmaximize()
  }

  public onCloseIconClick(event: any) {
    this.appWindowService.currentWindow().close()
  }

}
