import { Component } from '@angular/core'
import { Hotkey, HotkeysService } from '@swimlane/ngx-ui'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  hideAlertArea = false
  panelDisplayed = 'MainProcessEditor'
  // leftSplitSize =
  leftBottomSplitHidden = true

  @Hotkey('ctrl+q', 'Do some magic!')
  onKey() {
    // console.log('Hotkey', this)
    this.panelDisplayed = 'UtilitiesSelection'
  }

  onClickUtilitySelection(event: any) {
    // console.log(event)
    this.panelDisplayed = event
  }
}
