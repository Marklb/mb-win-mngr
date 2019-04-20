import { Component, Input, OnInit } from '@angular/core'

@Component({
  selector: 'mbwm-card-widget',
  templateUrl: './card-widget.component.html',
  styleUrls: ['./card-widget.component.scss']
})
export class CardWidgetComponent implements OnInit {

  @Input() public expanded = false
  @Input() public title: string

  constructor() { }

  ngOnInit() {
  }

}
