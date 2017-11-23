import { Component, OnInit, Output, EventEmitter } from '@angular/core'

@Component({
  selector: 'app-panel-utilities-selection',
  templateUrl: './panel-utilities-selection.component.html',
  styleUrls: ['./panel-utilities-selection.component.scss']
})
export class PanelUtilitiesSelectionComponent implements OnInit {

  @Output('clickUtilitySelection')
  clickUtilitySelection: EventEmitter<string> = new EventEmitter<string>();

  constructor() { }

  ngOnInit() {
  }

  onClickUtilitySelection(event: any, util: string) {
    console.log(util)
    this.clickUtilitySelection.emit(util)
  }

}
