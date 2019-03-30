import { HttpClient } from '@angular/common/http'
import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core'

import { ElectronService } from '@win-mngr/ui/app/providers/electron.service'

import { TodosQuery, TodosService } from '@win-mngr/extensions/ext-test-akita/state'

@Component({
  selector: 'app-ext-test-akita',
  templateUrl: './ext-test-akita.component.html',
  styleUrls: ['./ext-test-akita.component.scss']
})
export class ExtTestAkitaComponent implements OnInit, OnDestroy {

  constructor(
    private ref: ChangeDetectorRef,
    private electronService: ElectronService,
    private todosQuery: TodosQuery,
    private todosService: TodosService,
    public http: HttpClient
  ) { }

  ngOnInit() { }

  ngOnDestroy() { }

  logStore() {
    console.log(this)
    console.log(this.todosQuery.getAll())
  }

  addStore() {
    this.todosService.add('proc-1', 'Proc 1')
  }

}
