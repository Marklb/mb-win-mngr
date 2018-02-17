import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { RouterModule } from '@angular/router'
import { FlexLayoutModule } from '@angular/flex-layout'

import { VirtualDesktopUiComponent } from './virtual-desktop-ui/virtual-desktop-ui.component'

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    FlexLayoutModule
  ],
  exports: [
    VirtualDesktopUiComponent
  ],
  declarations: [VirtualDesktopUiComponent]
})
export class VirtualDesktopModule { }
