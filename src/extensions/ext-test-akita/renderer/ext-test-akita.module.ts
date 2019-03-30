import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { HttpClientModule } from '@angular/common/http'

import { AkitaNgDevtools } from '@datorama/akita-ngdevtools'

// import { SharedModule } from 'app/shared/shared.module'

import { ExtTestAkitaRoutingModule } from './ext-test-akita-router.module'

import { ExtTestAkitaComponent } from './ext-test-akita/ext-test-akita.component'


@NgModule({
  imports: [
    CommonModule,
    // SharedModule,
    HttpClientModule,
    AkitaNgDevtools.forRoot(),
    ExtTestAkitaRoutingModule
  ],
  declarations: [ExtTestAkitaComponent]
})
export class ExtTestAkitaModule { }
