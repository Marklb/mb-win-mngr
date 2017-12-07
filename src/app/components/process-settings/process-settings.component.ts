import { Component, OnInit, OnDestroy, ChangeDetectorRef,
  Output, Input, EventEmitter } from '@angular/core'
import { Subscription } from 'rxjs/Subscription'

import { ElectronService } from '../../providers/electron.service'

import { Process } from '../../../models/process'

@Component({
  selector: 'app-process-settings',
  templateUrl: './process-settings.component.html',
  styleUrls: ['./process-settings.component.scss']
})
export class ProcessSettingsComponent implements OnInit, OnDestroy {

  private _hWnd: number

  public processName: string = '<NO NAME>'

  @Output('clickCloseIcon')
  clickCloseIcon: EventEmitter<any> = new EventEmitter<any>()

  @Input('hWnd')
  set hWnd(hWnd: number) {
    this._hWnd = hWnd
    this.processName = `${hWnd}`
    this.electronService.getWindow(hWnd)
  }

  constructor(private ref: ChangeDetectorRef,
              private electronService: ElectronService) { }

  ngOnInit() {
  }

  ngOnDestroy() {
    // this.processesSubscription.unsubscribe()
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

}
