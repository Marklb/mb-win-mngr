import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core'

import { ElectronService } from 'app/providers/electron.service'

@Component({
  selector: 'app-window-presets',
  templateUrl: './window-presets.component.html',
  styleUrls: ['./window-presets.component.scss']
})
export class WindowPresetsComponent implements OnInit, OnDestroy {

  constructor(
    private ref: ChangeDetectorRef,
    private electronService: ElectronService
  ) { }

  ngOnInit() { }

  ngOnDestroy() { }

}
