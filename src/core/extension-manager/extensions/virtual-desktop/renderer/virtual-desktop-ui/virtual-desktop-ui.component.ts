import { Component, OnInit, ChangeDetectorRef } from '@angular/core'
import { ElectronService } from 'app/providers/electron.service'
import { IpcEvent } from 'shared/ipc'
import { VirtualDesktopGroupInfo } from 'core/extension-manager/extensions/virtual-desktop/main/virtual-desktop-common'
import { previousVirtualDesktopIndex, nextVirtualDesktopIndex } from '../../shared/redux/actions/virtual-desktop'
import { IVirtualDesktopProcessItem } from '../../../virtual-desktop/shared/models'

@Component({
  selector: 'app-virtual-desktop-ui',
  templateUrl: './virtual-desktop-ui.component.html',
  styleUrls: ['./virtual-desktop-ui.component.scss']
})
export class VirtualDesktopUiComponent implements OnInit {

  // public virtualDesktops: VirtualDesktopGroupInfo[] = []
  public selectedVirtualDesktopIndex: number = -1
  public actionState: string
  public processItems: IVirtualDesktopProcessItem[] = []

  constructor(private ref: ChangeDetectorRef,
              private electronService: ElectronService) {
    this.electronService.store.subscribe(async () => { this.onStateUpdated() })
  }

  ngOnInit() {
    this.onStateUpdated()
  }

  private onStateUpdated(): void {
    const state = this.electronService.store.getState()
    console.log('state: ', state)
    this.updateSelectedVirtualDesktopIndex()
    this.actionState = state.virtualDesktop.actionState

    const i = state.virtualDesktop.selectedVirtualDesktopIndex
    if (i !== undefined) {
      const vDesktop = state.virtualDesktop.virtualDesktops[i]
      const items = vDesktop.processItems
      // for (const item of items) {
      //   // this.processItems[item.index - 1] = item
      // }
      this.processItems = [...items]
    }

    this.ref.detectChanges()
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
