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
  private processes: Process[]
  private selectedProcess: Process

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

}
