import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'

import { IconModule } from '../icon/icon.module'

import { CardWidgetComponent } from './card-widget.component'

@NgModule({
  declarations: [
    CardWidgetComponent
  ],
  imports: [
    CommonModule,
    IconModule
  ],
  exports: [
    CardWidgetComponent
  ]
})
export class CardWidgetModule { }
