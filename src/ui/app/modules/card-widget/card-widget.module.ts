import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { CardWidgetComponent } from './card-widget.component'

@NgModule({
  declarations: [
    CardWidgetComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    CardWidgetComponent
  ]
})
export class CardWidgetModule { }
