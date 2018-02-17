import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'

import { CardWidgetComponent } from './card-widget/card-widget.component'


@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [,
    CardWidgetComponent
  ],
  exports: [
    CardWidgetComponent
  ]
})
export class SharedModule { }