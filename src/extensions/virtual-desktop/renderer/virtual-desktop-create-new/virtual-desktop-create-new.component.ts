import { Component, OnInit } from '@angular/core'
import { ElectronService } from '../../../../app/providers/electron.service'

@Component({
  selector: 'virtual-desktop-create-new',
  templateUrl: './virtual-desktop-create-new.component.html',
  styleUrls: ['./virtual-desktop-create-new.component.scss']
})
export class VirtualDesktopCreateNewComponent implements OnInit {

  public vDesktopName: string

  constructor(
    public electronService: ElectronService
  ) { }

  ngOnInit() {
  }

  public onClickCreate(event: any) {
    console.log('event', event, this.vDesktopName)
    this.electronService.ipcClient.send('ext:create-new', {
      vDesktopName: this.vDesktopName
    })
  }

}
