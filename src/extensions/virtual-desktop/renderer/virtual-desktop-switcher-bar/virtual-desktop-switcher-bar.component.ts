import { Component, OnInit } from '@angular/core'
import { VirtualDesktopService } from '../virtual-desktop.service'
import { switchMap, tap } from 'rxjs/operators'
import { empty } from 'rxjs'

@Component({
  selector: 'virtual-desktop-switcher-bar',
  templateUrl: './virtual-desktop-switcher-bar.component.html',
  styleUrls: ['./virtual-desktop-switcher-bar.component.scss']
})
export class VirtualDesktopSwitcherBarComponent implements OnInit {

  public selectedGroup$

  constructor(
    public virtualDesktop: VirtualDesktopService
  ) {
    this.selectedGroup$ = this.virtualDesktop.groups$
      .pipe(switchMap(_ => this.virtualDesktop.selectedGroup$))
  }

  ngOnInit() {
  }

  public onClickPrevBtn(event: any) {
    this.virtualDesktop.selectPreviousVirtualDesktop()
  }

  public onClickNextBtn(event: any) {
    this.virtualDesktop.selectNextVirtualDesktop()
  }
}
