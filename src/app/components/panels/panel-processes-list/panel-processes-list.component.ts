import { Component, OnInit, OnDestroy, OnChanges,
  SimpleChanges, SimpleChange, ChangeDetectorRef } from '@angular/core'
import { Subscription } from 'rxjs/Subscription'

import { ElectronService } from '../../../providers/electron.service'

import { Process } from '../../../../models/process'

@Component({
  selector: 'app-panel-processes-list',
  templateUrl: './panel-processes-list.component.html',
  styleUrls: ['./panel-processes-list.component.scss']
})
export class PanelProcessesListComponent implements OnInit, OnDestroy, OnChanges {

  private processesSubscription: Subscription
  private selectedProcessSubscription: Subscription

  private nodes: any[] = []
  private nodesOriginal: any[] = []
  private processes: Process[]
  private selectedProcess: Process | undefined
  private searchInputEnabled: boolean = false
  private searchInputValue: string = ''

  constructor(private ref: ChangeDetectorRef,
              private electronService: ElectronService) { }

  ngOnInit() {
    this.electronService.refreshProcesses()

    this.processesSubscription = this.electronService.getProcesses()
      .subscribe((processes: Process[]) => {
        const tmp: any = []
        for (const process of processes) {
          tmp.push({
            label: `[${process.hWnd}] ${process.title}`,
            expandable: false,
            // expanded: true
            model: {
              process: process
            }
          })
        }
        this.nodes = tmp
        this.nodesOriginal = tmp
        this.ref.detectChanges()
      })

    this.selectedProcessSubscription = this.electronService.getSelectedProcess()
      .subscribe((process: Process) => {
        this.selectedProcess = process
        console.log(this.selectedProcess)
        this.ref.detectChanges()
      })
  }

  ngOnDestroy() {
    this.processesSubscription.unsubscribe()
    this.selectedProcessSubscription.unsubscribe()
  }

  ngOnChanges(changes: SimpleChanges) {
    // console.log('PanelProcessesListComponent: ngOnChanges')
    // console.log(changes)
  }

  onSearchKeypress(event: any) {
    // console.log('onSearchKeypress')
    // console.log(event)
    // console.log(this.searchInputValue)
  }

  onSearchKeydown(event: any) {
    // console.log('onSearchKeydown', this.searchInputValue)
    // console.log(event)
    // console.log(this.searchInputValue)
    // console.log(event.target.value)

    // console.log(this.nodesOriginal)

    // this.nodes = this.nodesOriginal.filter(node => node.model.process.title.indexOf(this.searchInputValue) !== -1)
  }

  onSearchKeyup(event: any) {
    // console.log('onSearchKeydown', this.searchInputValue)
    // console.log(event)
    // console.log(this.searchInputValue)
    // console.log(event.target.value)

    // console.log(this.nodesOriginal)

    this.nodes = this.nodesOriginal.filter(node => node.model.process.title.toLowerCase().indexOf(event.target.value.toLowerCase()) !== -1)
  }

  onRefreshIconClick(event: any) {
    this.electronService.refreshProcesses()
  }

}
