import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'

import { IconModule } from '../icon/icon.module'

import { WindowTitleBarComponent } from './window-title-bar.component'

@NgModule({
  declarations: [
    WindowTitleBarComponent
  ],
  imports: [
    CommonModule,
    IconModule
  ],
  exports: [
    WindowTitleBarComponent
  ]
})
export class WindowTitleBarModule { }
