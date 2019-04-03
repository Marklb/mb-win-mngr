import { Component, Input, OnInit } from '@angular/core'
import { Observable } from 'rxjs'

import { AppWindowService } from '../../providers/app-window.service'

@Component({
  selector: 'mbwm-window-title-bar',
  templateUrl: './window-title-bar.component.html',
  styleUrls: ['./window-title-bar.component.scss']
})
export class WindowTitleBarComponent implements OnInit {

  public title$: Observable<string>

  constructor(
    private appWindowService: AppWindowService
  ) { }

  ngOnInit() {
    this.title$ = this.appWindowService.windowTitle()
  }

  onCloseIconClick(event: any) {
    this.appWindowService.closeWindow()
  }

}
