import { Component, OnInit, Input } from '@angular/core'
import { ElectronService } from 'app/providers/electron.service'
import { IpcEvent, IpcAction } from 'shared/ipc'

@Component({
  selector: 'app-app-user-model-id-input',
  templateUrl: './app-user-model-id-input.component.html',
  styleUrls: ['./app-user-model-id-input.component.scss']
})
export class AppUserModelIdInputComponent implements OnInit {

  _appUserModelIdInput: string = ''

  @Input()
  set appUserModelIdInput(val: string) {
    this._appUserModelIdInput = val
  }
  get appUserModelIdInput() {
    return this._appUserModelIdInput
  }

  @Input() hWnd: number

  constructor(
    public electronService: ElectronService,
  ) { }

  ngOnInit() {
  }

  onClickAppUserModelIdSetBtn(event: any) {
    console.log('this.hWnd', this.hWnd)
    console.log('this.appUserModelIdInput', this.appUserModelIdInput)
    // this.electronService.setAppUserModelIID(this.hWnd, this.appUserModelIdInput)
  }

  private async _setId(hWnd: number, id: string) {
    return new Promise<void>((resolve, reject) => {
      const listenFunc = async (ipcEvent: IpcEvent) => {
        console.log('IpcAction. set:id', ipcEvent)
        // const winData = ipcEvent.data.data.windowData
        // this.windowData = winData
        // this.processChange.emit(ipcEvent.data.data)
        this.electronService.ipcClient.unlisten('set:id', listenFunc)

        // resolve(winData)
        resolve()
      }

      this.electronService.ipcClient.listen('set:id', listenFunc)

      this.electronService.ipcClient.send('set:id', { hWnd: hWnd, appUserModelIdInput: id })
      console.log('sent')
    })
  }

}
