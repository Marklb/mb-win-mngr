import { Component, OnInit, OnDestroy, ChangeDetectorRef,
  Output, EventEmitter } from '@angular/core'
import { Subscription } from 'rxjs/Subscription'

import { ElectronService } from '../../providers/electron.service'

import { Process } from '../../../models/process'

@Component({
  selector: 'app-processes-list',
  templateUrl: './processes-list.component.html',
  styleUrls: ['./processes-list.component.scss']
})
export class ProcessesListComponent implements OnInit, OnDestroy {

  private processesSubscription: Subscription

  @Output('clickCloseIcon')
  clickCloseIcon: EventEmitter<any> = new EventEmitter<any>()

  @Output('clickProcessRow')
  clickProcessRow: EventEmitter<any> = new EventEmitter<any>()

  private nodesOriginal = []
  private nodes = []

  constructor(private ref: ChangeDetectorRef,
              private electronService: ElectronService) { }

  ngOnInit() {
    this.electronService.refreshProcesses()

    this.processesSubscription = this.electronService.getProcesses()
      .subscribe((processes: Process[]) => {
        this.nodes = processes
        this.nodesOriginal = processes
        this.ref.detectChanges()
      })
  }

  ngOnDestroy() {
    this.processesSubscription.unsubscribe()
  }

  onSearchKeypress(event: any) {
    // console.log('onSearchKeypress')
    // console.log(event)
  }

  onSearchKeydown(event: any) {
    // console.log('onSearchKeydown', this.searchInputValue)
    // console.log(event)
  }

  onSearchKeyup(event: any) {
    // console.log('onSearchKeydown', this.searchInputValue)
    // console.log(event)

    this.nodes = this.nodesOriginal.filter(node => node.title.toLowerCase().indexOf(event.target.value.toLowerCase()) !== -1)
  }

  onTableRowActivate(event: any) {
    // console.log('Clicked', event)
    if (event.type === 'click') {
      this.clickProcessRow.emit(event)
    }
  }

  onRefreshIconClick(event: any) {
    this.electronService.refreshProcesses()
  }

  onCloseIconClick(event: any) {
    this.clickCloseIcon.emit(event)
  }

}
