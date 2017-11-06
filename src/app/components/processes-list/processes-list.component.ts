import { Component, OnInit, OnChanges, Input,
  SimpleChanges, SimpleChange } from '@angular/core'

import { ElectronService } from '../../providers/electron.service'

import { Process } from '../../../models/process'

@Component({
  selector: 'app-processes-list',
  templateUrl: './processes-list.component.html',
  styleUrls: ['./processes-list.component.scss']
})
export class ProcessesListComponent implements OnInit, OnChanges {

  @Input() selectedProcess: any
  @Input() nodes: any[] = []

  constructor(private electronService: ElectronService) { }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges) {
    console.log('ProcessesListComponent: ngOnChanges')
    // console.log('ngOnChanges')
    // console.log(changes)
  }

  onSelectProcess(event: any, process: Process) {
    console.log('Select Process')
    console.log(process)
    this.electronService.setSelectedProcess(process)
  }

}
