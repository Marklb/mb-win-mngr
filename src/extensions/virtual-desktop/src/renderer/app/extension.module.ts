import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'

import { WindowTitleBarModule } from '@win-mngr/ui'

import { VirtualDesktopComponent } from './virtual-desktop/virtual-desktop.component'


@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    WindowTitleBarModule
  ],
  declarations: [VirtualDesktopComponent],
  bootstrap: [VirtualDesktopComponent]
})
export class ExtensionModule { }
