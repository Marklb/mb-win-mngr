// tslint:disable:no-namespace
export namespace IpcConstants {
  export const MsgFromServer = 'MSG_FROM_SERVER'
  export const MsgFromClient = 'MSG_FROM_CLIENT'
}
// tslint:enable:no-namespace

export enum IpcDataType {
  ElectronMain,
  ElectronRenderer
}

export enum IpcAction {
  GetOpenWindows = 'GET_OPEN_WINDOWS',
  SubscribeToOpenWindows = 'SUBSCRIBE_TO_OPEN_WINDOWS',
  OpenElectronWindow = 'OPEN_ELECTRON_WINDOW',
  WindowSelect = 'WINDOW_SELECT',
  GetWindowData = 'GET_WINDOW_DATA',
  // HotkeyManager
  HotkeyManagerGetHotkeys = 'HotkeyManager::GET_HOTKEYS',
  HotkeyManagerAttemptAction = 'HotkeyManager::ATTEMPT_ACTION',
  // ActionsManager
  ActionsManagerTriggerAction = 'ActionsManager::TRIGGER_ACTION'
}

export class IpcData {
  public actionName: IpcAction | string
  public type: IpcDataType
  public data: any
  public subscribe = false
}

export interface IpcEvent<E = any, D = any> {
  event: any
  data: any
}

export type IpcFunc = (ipcEvent: IpcEvent) => Promise<any>

export interface RegisteredIpcAction { [actionName: string]: IpcFunc[] }

export class IpcSerializationObj {
  serializedData: any
}

export interface IpcSerializable {
  ipcSerialize(): IpcSerializationObj
}
