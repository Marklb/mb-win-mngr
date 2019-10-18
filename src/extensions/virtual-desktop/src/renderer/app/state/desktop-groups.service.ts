import { Injectable } from '@angular/core'
// import { HttpClient } from '@angular/common/http'
import { tap } from 'rxjs/operators'

import { DesktopGroupsStore } from './desktop-groups.store'

@Injectable({ providedIn: 'root' })
export class DesktopGroupsService {

  constructor(
    private desktopGroupsStore: DesktopGroupsStore
  ) {
  }

  get() {
    // return this.http.get('').pipe(tap(entities => this.desktopGroupsStore.set(entities)));


  }
}
