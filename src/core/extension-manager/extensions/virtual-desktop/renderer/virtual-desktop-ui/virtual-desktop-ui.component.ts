import { Component, OnInit, ChangeDetectorRef } from '@angular/core'
import { ElectronService } from 'app/providers/electron.service'
import { IpcEvent } from 'shared/ipc'
import { VirtualDesktopGroupInfo } from 'core/extension-manager/extensions/virtual-desktop/main/virtual-desktop-common'
import { previousVirtualDesktopIndex, nextVirtualDesktopIndex } from '../../shared/redux/actions/virtual-desktop'

@Component({
  selector: 'app-virtual-desktop-ui',
  templateUrl: './virtual-desktop-ui.component.html',
  styleUrls: ['./virtual-desktop-ui.component.scss']
})
export class VirtualDesktopUiComponent implements OnInit {

  // public virtualDesktops: VirtualDesktopGroupInfo[] = []
  public selectedVirtualDesktopIndex: number = -1

  constructor(private ref: ChangeDetectorRef,
              private electronService: ElectronService) {
    this.electronService.store.subscribe(async () => {
      const state = this.electronService.store.getState()
      console.log('state: ', state)
      this.updateSelectedVirtualDesktopIndex()
      this.ref.detectChanges()
    })

    this.updateSelectedVirtualDesktopIndex()
  }

  ngOnInit() {

  }

  public updateSelectedVirtualDesktopIndex(): void {
    const state = this.electronService.store.getState()
    const idx = state.virtualDesktop.selectedVirtualDesktopIndex
    this.selectedVirtualDesktopIndex = idx
  }

  public get selectedVirtualDesktop(): any {
    if (this.selectedVirtualDesktopIndex >= 0) {
      const state = this.electronService.store.getState()
      const vd = state.virtualDesktop
      return vd.virtualDesktops[this.selectedVirtualDesktopIndex]
    }
  }

  public onClickPrevBtn(event: any) {
    this.electronService.store.dispatch(previousVirtualDesktopIndex())
  }

  public onClickNextBtn(event: any) {
    this.electronService.store.dispatch(nextVirtualDesktopIndex())
  }

}
