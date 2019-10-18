import { BehaviorSubject, Observable } from 'rxjs'
import { map } from 'rxjs/operators'

// import uuid from 'uuid'

import { IVirtualDesktop, IVirtualDesktopState } from '../shared/models/index'

export class VirtualDesktopsManager {

  private _store = new BehaviorSubject<IVirtualDesktopState>({
    desktops: [],
    selectedIndex: 0
  })

  public desktops$: Observable<IVirtualDesktop[]>

  public selectedDesktop$: Observable<IVirtualDesktop | null>

  constructor() {
    this.desktops$ = this._store.pipe(
      map(state => state.desktops)
    )

    this.selectedDesktop$ = this._store.pipe(
      map(state => state.selectedIndex < state.desktops.length ? state.desktops[state.selectedIndex] : null)
    )
  }

  // public create(name: string): IVirtualDesktop {
  //   return {

  //   }
  // }

  public add() {

  }

}
