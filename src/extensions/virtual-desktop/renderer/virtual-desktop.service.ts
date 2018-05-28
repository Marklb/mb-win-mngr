import { Injectable } from '@angular/core';
import { ElectronService } from '../../../app/providers/electron.service'
import { BehaviorSubject, Observable, empty } from 'rxjs'
import { VirtualDesktopGroup } from '../main/virtual-desktop-group'
import { flatMap, find, take, switchMap, findIndex, map } from 'rxjs/operators'
import { IpcEvent } from '../../../shared/ipc'

@Injectable()
export class VirtualDesktopService {

  private groupsSubject = new BehaviorSubject<VirtualDesktopGroup[]>([])

  public groups$ = this.groupsSubject.asObservable()

  // public selectedGroup$ = this.groups$
  //   .pipe(flatMap(val => val))
  //   .pipe(find(val => val.isSelected))

  public selectedGroup$ = this.groups$
    .pipe(switchMap(groups => groups))
    .pipe(find(val => val.isSelected))

  public selectedGroupIndex$ = this.groupIndex(this.selectedGroup$)

  public prevGroup$ = this.selectedGroupIndex$
    .pipe(switchMap(idx =>
      this.groups$
        .pipe(map(groups => (idx <= 0) ? null : groups[idx - 1]))
    ))

  public prevGroupIndex$ = this.groupIndex(this.prevGroup$)

  public nextGroup$ = this.selectedGroupIndex$
    .pipe(switchMap(idx =>
      this.groups$
        .pipe(map(groups => (idx >= groups.length - 1) ? null : groups[idx + 1]))
    ))

  public nextGroupIndex$ = this.groupIndex(this.nextGroup$)

  constructor(
    public electronService: ElectronService
  ) {
    this.electronService.ipcClient.listen('ext:vd-groups', async (ipcEvent: IpcEvent) => {
      const groups = []
      for (const grp of ipcEvent.data.data.groups) {
        groups.push(VirtualDesktopGroup.fromIpcSerialized(grp))
      }
      setTimeout(() => {
        this.groupsSubject.next(groups)
      })
    })
  }

  public selectPreviousVirtualDesktop() {
    // this.prevGroup$
    //   .subscribe(prev => {
    //     console.log(prev)
    //   })

    this.prevGroupIndex$
      .pipe(take(1))
      .subscribe(idx => {
        console.log(idx)
        if (idx !== null) {
          this.electronService.ipcClient.send('ext:select-vd', idx)
        }
      })
  }

  public selectNextVirtualDesktop() {
    // this.nextGroup$
    //   .subscribe(next => {
    //     console.log(next)
    //   })

    this.nextGroupIndex$
      .pipe(take(1))
      .subscribe(idx => {
        console.log(idx)
        if (idx !== null) {
          this.electronService.ipcClient.send('ext:select-vd', idx)
        }
      })
  }

  public groupIndex(group$: Observable<VirtualDesktopGroup>): Observable<number> {
    return group$
      .pipe(switchMap(group =>
        this.groups$
          .pipe(flatMap(val => val))
          .pipe(findIndex(val => val === group))
      ))
  }

}
