import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { RouterModule } from '@angular/router'
import { FormsModule } from '@angular/forms'

import { FlexLayoutModule } from '@angular/flex-layout'

import { VirtualDesktopRoutingModule } from './virtual-desktop-router.module';

import { VirtualDesktopUiComponent } from './virtual-desktop-ui/virtual-desktop-ui.component'
import { VirtualDesktopNoneExistComponent } from './virtual-desktop-none-exist/virtual-desktop-none-exist.component'
import { VirtualDesktopSwitcherBarComponent } from './virtual-desktop-switcher-bar/virtual-desktop-switcher-bar.component'
import { VirtualDesktopProcessesManagerComponent } from './virtual-desktop-processes-manager/virtual-desktop-processes-manager.component'
import { VirtualDesktopCreateNewComponent } from './virtual-desktop-create-new/virtual-desktop-create-new.component'

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    FlexLayoutModule,
    VirtualDesktopRoutingModule
  ],
  exports: [
    VirtualDesktopUiComponent,
  ],
  declarations: [
    VirtualDesktopUiComponent,
    VirtualDesktopNoneExistComponent,
    VirtualDesktopSwitcherBarComponent,
    VirtualDesktopProcessesManagerComponent,
    VirtualDesktopCreateNewComponent,
  ]
})
export class VirtualDesktopModule { }
