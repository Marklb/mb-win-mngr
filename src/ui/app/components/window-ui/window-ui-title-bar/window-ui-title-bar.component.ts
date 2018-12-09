import { Component, OnInit } from '@angular/core'
import { AppWindowService } from 'app/providers/app-window.service'

@Component({
  selector: 'app-window-ui-title-bar',
  templateUrl: './window-ui-title-bar.component.html',
  styleUrls: ['./window-ui-title-bar.component.scss']
})
export class WindowUiTitleBarComponent implements OnInit {

  public title: string = '<No Title'

  constructor(private appWindowService: AppWindowService) { }

  ngOnInit() {
    this.appWindowService.windowTitle().subscribe(title => this.title = title)
  }

  onRefreshIconClick(event: any) {
    console.log('onRefreshIconClick: ', event)
  }

  onCogIconClick(event: any) {
    console.log('onCogIconClick: ', event)
  }

  onCloseIconClick(event: any) {
    this.appWindowService.closeWindow()
  }

}
