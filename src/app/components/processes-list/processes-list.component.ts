import { Component, OnInit, Input } from '@angular/core'

@Component({
  selector: 'app-processes-list',
  templateUrl: './processes-list.component.html',
  styleUrls: ['./processes-list.component.scss']
})
export class ProcessesListComponent implements OnInit {

  @Input() nodes: any[] = []

  constructor() { }

  ngOnInit() {
  }

}
