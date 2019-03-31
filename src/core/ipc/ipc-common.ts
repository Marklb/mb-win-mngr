export namespace IpcConstants {
  export const MsgFromServer: string = 'MSG_FROM_SERVER'
  export const MsgFromClient: string = 'MSG_FROM_CLIENT'
}

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
  public subscribe: boolean = false
}

export interface IpcEvent {
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