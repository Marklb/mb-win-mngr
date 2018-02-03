import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { RouterModule } from '@angular/router'
import { VirtualDesktopUiComponent } from './virtual-desktop-ui.component'

@NgModule({
  imports: [
    CommonModule,
    RouterModule
  ],
  exports: [
    VirtualDesktopUiComponent
  ],
  declarations: [VirtualDesktopUiComponent]
})
export class VirtualDesktopUiModule { }
