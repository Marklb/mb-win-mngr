import { Injectable } from '@angular/core'
import { EntityState, EntityStore, StoreConfig } from '@datorama/akita'

import { DesktopGroup } from './desktop-group.model'

export interface DesktopGroupsState extends EntityState<DesktopGroup> {}

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'desktop-groups' })
export class DesktopGroupsStore extends EntityStore<DesktopGroupsState> {

  constructor() {
    super()
  }

}
