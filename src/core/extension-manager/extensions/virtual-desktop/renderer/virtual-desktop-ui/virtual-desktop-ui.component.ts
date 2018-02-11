import { Component, OnInit } from '@angular/core'
import { ElectronService } from 'app/providers/electron.service'
import { IpcEvent } from 'shared/ipc'
import { VirtualDesktopGroupInfo } from 'core/extension-manager/extensions/virtual-desktop/main/virtual-desktop-common'

@Component({
  selector: 'app-virtual-desktop-ui',
  templateUrl: './virtual-desktop-ui.component.html',
  styleUrls: ['./virtual-desktop-ui.component.scss']
})
export class VirtualDesktopUiComponent implements OnInit {

  // public virtualDesktops: VirtualDesktopGroupInfo[] = []
  public selectedVirtualDesktopIndex: number = -1

  constructor(private electronService: ElectronService) {
    this.electronService.store.subscribe(async () => {
      const state = this.electronService.store.getState()
      console.log('state: ', state)
      this.updateSelectedVirtualDesktopIndex()
    })

    setTimeout(() => {
      this.updateSelectedVirtualDesktopIndex()
    })
  }

  ngOnInit() {
    // this._registerIpcEvents()
    // this.electronService.ipcClient.send('VirtualDesktopExtension::GET_GROUPS')
  }

  public updateSelectedVirtualDesktopIndex(): void {
    const state = this.electronService.store.getState()
    const idx = state.virtualDesktop.selectedVirtualDesktopIndex
    this.selectedVirtualDesktopIndex = idx
  }

  // private _registerIpcEvents(): void {
  //   // this.electronService.ipcClient
  //   //   .listen('VirtualDesktopExtension::GET_GROUPS_RESPONSE', async (ipcEvent: IpcEvent) => {
  //   //     console.log('VirtualDesktopExtension::GET_GROUPS_RESPONSE', ipcEvent)
  //   //     const data: any = ipcEvent.data.data
  //   //     console.log('data: ', data)
  //   //     setTimeout(() => {
  //   //       this.virtualDesktops = [...data.groups]
  //   //       if (this.virtualDesktops && this.virtualDesktops.length > 0) {
  //   //         if (this.selectedVirtualDesktopIndex > this.virtualDesktops.length) {
  //   //           this.selectedVirtualDesktopIndex = this.virtualDesktops.length
  //   //         } else {
  //   //           this.selectedVirtualDesktopIndex = 0
  //   //         }
  //   //       } else {
  //   //         this.selectedVirtualDesktopIndex = -1
  //   //       }
  //   //     })
  //   //   })
  // }

  public get selectedVirtualDesktop(): any {
    if (this.selectedVirtualDesktopIndex >= 0) {
      const state = this.electronService.store.getState()
      const vd = state.virtualDesktop
      return vd.virtualDesktops[this.selectedVirtualDesktopIndex]
    }
  }

  public onClickPrevBtn(event: any) {

  }

  public onClickNextBtn(event: any) {

  }

}
