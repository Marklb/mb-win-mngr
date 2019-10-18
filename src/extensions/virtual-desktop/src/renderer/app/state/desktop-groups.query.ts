import { Injectable } from '@angular/core'
import { QueryEntity } from '@datorama/akita'

import { DesktopGroupsState, DesktopGroupsStore } from './desktop-groups.store'

@Injectable({ providedIn: 'root' })
export class DesktopGroupsQuery extends QueryEntity<DesktopGroupsState> {

  constructor(protected store: DesktopGroupsStore) {
    super(store)
  }

}
