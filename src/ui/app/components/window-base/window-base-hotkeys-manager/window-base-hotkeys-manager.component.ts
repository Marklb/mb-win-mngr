import { Component, OnInit } from '@angular/core';
import { AppWindowService } from 'app/providers/app-window.service'

@Component({
  selector: 'app-window-base-hotkeys-manager',
  templateUrl: './window-base-hotkeys-manager.component.html',
  styleUrls: ['./window-base-hotkeys-manager.component.scss']
})
export class WindowBaseHotkeysManagerComponent implements OnInit {

  constructor(private appWindowService: AppWindowService) { }

  ngOnInit() {
    this.appWindowService.setWindowTitle('Hotkeys Manager')
  }

}
