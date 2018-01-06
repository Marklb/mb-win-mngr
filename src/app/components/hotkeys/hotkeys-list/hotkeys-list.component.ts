import { Component, OnInit, Input, ViewChild, AfterViewInit, ViewContainerRef, ContentChild } from '@angular/core'
import { HotkeyInfo } from 'core/hotkeys/hotkey-info'
import { HotkeyPanelComponent } from 'app/components/hotkeys/hotkey-panel/hotkey-panel.component'

@Component({
  selector: 'app-hotkeys-list',
  templateUrl: './hotkeys-list.component.html',
  styleUrls: ['./hotkeys-list.component.scss']
})
export class HotkeysListComponent implements OnInit, AfterViewInit {

  @Input('hotkeys') private hotkeys: HotkeyInfo[]

  // @ViewChild(HotkeyPanelComponent) private hotkeyPanelChild: HotkeyPanelComponent
  // // @ViewChild('cellTemplate', { read: ViewContainerRef }) cellTemplate: ViewContainerRef;
  // @ViewChild('cellTemplate', { read: ViewContainerRef }) cellTemplate: ViewContainerRef;

  @ContentChild(HotkeyPanelComponent) private hotkeyPanelChild: HotkeyPanelComponent
  // @ViewChild('cellTemplate', { read: ViewContainerRef }) cellTemplate: ViewContainerRef;
  @ContentChild('cellTemplate', { read: ViewContainerRef }) cellTemplate: ViewContainerRef;

  constructor() { }

  ngOnInit() {
  }

  ngAfterViewInit() {
    // console.log(`ngAfterViewInit - hotkeyPanelChild is ${this.hotkeyPanelChild}`);
    console.log('ngAfterViewInit - hotkeyPanelChild: ', this.hotkeyPanelChild)
    console.log('ngAfterViewInit - cellTemplate: ', this.cellTemplate)
    console.log(this)
  }

}
