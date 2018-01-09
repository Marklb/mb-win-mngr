import { Component, OnInit, OnDestroy, ChangeDetectorRef,
  Output, Input, EventEmitter } from '@angular/core'
import { Subscription } from 'rxjs/Subscription'

import { ElectronService } from 'app/providers/electron.service'

import { Process } from 'models/process'
import { WindowData } from 'models/window-data'
import { IpcAction, IpcEvent } from 'shared/ipc'

@Component({
  selector: 'app-process-settings',
  templateUrl: './process-settings.component.html',
  styleUrls: ['./process-settings.component.scss']
})
export class ProcessSettingsComponent implements OnInit, OnDestroy {

  private _hWnd: number

  private appUserModelIdInput: string

  public processName: string = '<NO NAME>'
  public windowData: WindowData

  @Output('processChange')
  processChange: EventEmitter<any> = new EventEmitter<any>()

  @Output('clickCloseIcon')
  clickCloseIcon: EventEmitter<any> = new EventEmitter<any>()

  @Input('hWnd')
  set hWnd(hWnd: number) {
    this._hWnd = hWnd
    this.processName = `${hWnd}`
    // this.electronService.getWindowData(hWnd).then((winData: WindowData) => {
    //   console.log(winData)
    //   this.windowData = winData
    //   this.appUserModelIdInput = winData.appUserModelId
    //   this.processName = `[${hWnd}] ${winData.title}`
    // })
    this.electronService.ipcClient.send(IpcAction.GetWindowData, { hWnd: hWnd })
  }

  constructor(private ref: ChangeDetectorRef,
              private electronService: ElectronService) { }

  ngOnInit() {
    this._registerIpcEvents()
  }

  ngOnDestroy() {
    // this.processesSubscription.unsubscribe()
  }

  private _registerIpcEvents(): void {
    this.electronService.ipcClient.listen(IpcAction.GetWindowData, async (ipcEvent: IpcEvent) => {
      console.log('IpcAction.GetWindowData', ipcEvent)
      const winData = ipcEvent.data.data.windowData
      this.windowData = winData
      this.processChange.emit(ipcEvent.data.data)
    })
  }

  // onSearchKeypress(event: any) {
  //   // console.log('onSearchKeypress')
  //   // console.log(event)
  // }

  // onSearchKeydown(event: any) {
  //   // console.log('onSearchKeydown', this.searchInputValue)
  //   // console.log(event)
  // }

  // onSearchKeyup(event: any) {
  //   // console.log('onSearchKeydown', this.searchInputValue)
  //   // console.log(event)

  // }

  onRefreshIconClick(event: any) {
    // this.electronService.refreshProcesses()
  }

  onCloseIconClick(event: any) {
    this.clickCloseIcon.emit(event)
  }

  onClickAppUserModelIdSetBtn(event: any) {
    console.log('Id', this.appUserModelIdInput)
    this.electronService.setAppUserModelIID(this.windowData.hWnd,
      this.appUserModelIdInput)
  }

}
