import { Observable } from 'rxjs/Observable'
import { Subject } from 'rxjs/Subject'


export interface ActionEvent {
  identifier: string
  data: any
}

export interface ObservableActionsItem {
  identifier: string
  subject: Subject<ActionEvent>
}

export interface ObservableActions { [identifier: string]: ObservableActionsItem }

export class ActionsManager {

  private _actions: ObservableActions = {}

  constructor() { }

  public registerAction(identifier: string): Observable<ActionEvent> {
    if (this._actions[identifier] === undefined) {
      this._actions[identifier] = {
        identifier: '',
        subject: new Subject<ActionEvent>()
      }
    }
    return this._actions[identifier].subject.asObservable()
  }

  public triggerAction(identifier: string, data?: any): boolean {
    if (this._actions[identifier] === undefined) {
      return false
    }

    this._actions[identifier].subject.next({
      identifier: identifier,
      data: data
    })

    return true
  }

}
