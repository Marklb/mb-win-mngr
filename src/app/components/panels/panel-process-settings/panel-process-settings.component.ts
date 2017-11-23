import { Component, OnInit, OnDestroy, OnChanges,
  SimpleChanges, SimpleChange, ChangeDetectorRef } from '@angular/core'
  import { Subscription } from 'rxjs/Subscription'

import { ElectronService } from '../../../providers/electron.service'

import { Process } from '../../../../models/process'

@Component({
  selector: 'app-panel-process-settings',
  templateUrl: './panel-process-settings.component.html',
  styleUrls: ['./panel-process-settings.component.scss']
})
export class PanelProcessSettingsComponent implements OnInit, OnDestroy {

  private selectedProcessSubscription: Subscription
  private appUserModelIIDSubscription: Subscription

  private selectedProcess: Process | undefined
  private appUserModelIIDOriginal: string
  private appUserModelIIDValue: string
  inputValue: string = ''
  hideAlertArea = false
  pidInputValue: string = ''

  constructor(private ref: ChangeDetectorRef,
              private electronService: ElectronService) { }

  ngOnInit() {
    setInterval(() => { this.ref.markForCheck() }, 30)

    this.selectedProcessSubscription = this.electronService.getSelectedProcess()
      .subscribe((process: Process | undefined) => {
        this.selectedProcess = process
        if (process !== undefined) {
          this.electronService.refreshAppUserModelIID(process.hWnd)
        }
        this.ref.detectChanges()
      })

    this.appUserModelIIDSubscription = this.electronService.getAppUserModelIID()
      .subscribe((appUserModelIID: string) => {
        this.appUserModelIIDOriginal = appUserModelIID
        this.appUserModelIIDValue = appUserModelIID
        this.ref.detectChanges()
      })
  }

  ngOnDestroy() {
    this.selectedProcessSubscription.unsubscribe()
    this.appUserModelIIDSubscription.unsubscribe()
  }

  onClickSetAppUserModelIID(event: any) {
    console.log('onClickSetAppUserModelIID')
    console.log(this.selectedProcess.hWnd)
    console.log(this.appUserModelIIDValue)
    this.electronService.setAppUserModelIID(this.selectedProcess.hWnd,
      this.appUserModelIIDValue)
  }

}


// <div *ngIf="selectedProcess; else elseBlock">
//   <ngx-section
//     class="shadow"
//     [sectionTitle]="'[' + selectedProcess.hWnd + '] ' + selectedProcess.title">
//     <!-- <ngx-input
//       type="text"
//       [label]="'AppUserIID'"
//       [ngModel]="'ewd'">
//     </ngx-input> -->
//     <ngx-input
//       type="text"
//       [label]="'Name'"
//       [autofocus]="true"
//       [ngModel]="inputValue"
//       [hint]="'Enter your first and last name'"
//       (change)="inputValue = $event">
//     </ngx-input>
//   </ngx-section>
//   </div>
//   <!-- Process not selected -->
//   <ng-template #elseBlock>
//     <div fxFlexFill>
//       <ngx-section class="shadow shadow-fx" style="max-width: 500px; margin: 0 auto; text-align: center; cursor: default; user-select: none;">
//         <h2>Select a Process</h2>
//       </ngx-section>
//     </div>
//   </ng-template>


//   <div fxFlex="300px" fxFlexFill ngxSplitArea>
//   <div fxLayout="column" fxFlexFill ngxSplit="column">
//     <div fxFlex="1 1 70%" ngxSplitArea>
//       <app-panel-processes-list></app-panel-processes-list>
//     </div>
//     <div fxFlex="0 0 15px" ngxSplitHandle class="noise"></div>
//     <div fxFlex="1 1 30%" ngxSplitArea>
//       <h2>Alerts</h2>
//       <ul>
//         <li>DDOS</li>
//         <li>DDOS</li>
//         <li>DDOS</li>
//       </ul>
//     </div>
//   </div>
//   </div>
//   <div fxFlex="15px" ngxSplitHandle [fxShow]="!hideAlertArea" class="noise"></div>
//   <div fxFlex
//   style="padding:10px"
//   ngxSplitArea
//   *ngIf="!hideAlertArea">
//   <ngx-input
//     type="text"
//     [label]="'Name'"
//     [autofocus]="true"
//     [ngModel]="inputValue"
//     [hint]="'Enter your first and last name'"
//     (change)="inputValue = $event">
//   </ngx-input>
// </div>
