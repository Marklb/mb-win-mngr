import { Component, OnInit } from '@angular/core'
import { AppWindowService } from 'app/providers/app-window.service'
import { ActivatedRoute } from '@angular/router'

@Component({
  selector: 'app-electron-window-base',
  templateUrl: './electron-window-base.component.html',
  styleUrls: ['./electron-window-base.component.scss']
})
export class ElectronWindowBaseComponent implements OnInit {

  constructor(private route: ActivatedRoute,
              private appWindowService: AppWindowService) {
    const params = route.snapshot.params

  }

  ngOnInit() {
  }

}
