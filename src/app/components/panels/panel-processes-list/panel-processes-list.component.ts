import { Component, OnInit, OnDestroy } from '@angular/core'
import { Subscription } from 'rxjs/Subscription'

import { ElectronService } from '../../../providers/electron.service'

import { Process } from '../../../../models/process'

@Component({
  selector: 'app-panel-processes-list',
  templateUrl: './panel-processes-list.component.html',
  styleUrls: ['./panel-processes-list.component.scss']
})
export class PanelProcessesListComponent implements OnInit, OnDestroy {

  nodes: any[] = [
    { label: 'Node 1' },
    {
        label: 'Node 2',
        expandable: true,
        expanded: true,
        children: [
          { label: 'Node 1' },
          { label: 'Node 2' },
          {
            label: 'Node 3',
            expanded: false,
            expandable: true,
            children: [
              { label: 'Node 1' },
              { label: 'Node 2' },
              { label: 'Node 3' },
              { label: 'Node 4' }
            ]
          },
          {
            label: 'Node 4',
            expandable: true,
            expanded: true,
            children: [
              { label: 'Node 1' },
              { label: 'Node 2' },
              { label: 'Node 3' },
              { label: 'Node 4' }
            ]
          }
        ]
    },
    { label: 'Node 3' },
    {
      label: 'Node 4',
      children: [
        { label: 'Node 1' },
        { label: 'Node 2' },
        { label: 'Node 3' },
        { label: 'Node 4' }
      ],
      expandable: true
    }
  ]

  processes: Process[]
  processesSubscription: Subscription

  constructor(private electronService: ElectronService) {
    this.processesSubscription = electronService.getProcesses()
      .subscribe(processes => this.processes = processes)
  }

  ngOnInit() {
    // this.electronService.getProcesses()
  }

  ngOnDestroy() {
    this.processesSubscription.unsubscribe()
  }

}
