export namespace IpcConstants {
  export const MsgFromServer: string = 'MSG_FROM_SERVER'
  export const MsgFromClient: string = 'MSG_FROM_CLIENT'
}

export enum IpcDataType {
  ElectronMain,
  ElectronRenderer
}

export class IpcData {
  public id: number
  public type: IpcDataType
}
