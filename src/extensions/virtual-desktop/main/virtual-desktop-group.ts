import { IpcSerializable, IpcSerializationObj } from '../../../shared/ipc/ipc-common'
import { IVirtualDesktopProcessItem } from '../shared/models'

export class VirtualDesktopGroup implements IpcSerializable {

  public groupName: string
  public isSelected: boolean
  public processes: IVirtualDesktopProcessItem[]

  static fromIpcSerialized(obj: IpcSerializationObj) {
    const newVDGroup = new VirtualDesktopGroup(obj.serializedData.groupName)
    newVDGroup.isSelected = obj.serializedData.isSelected
    return newVDGroup
  }

  constructor(groupName) {
    this.groupName = groupName
  }

  /**
   *
   */
  public ipcSerialize(): IpcSerializationObj {
    const s = new IpcSerializationObj

    const vdgi = {
      groupName: this.groupName,
      isSelected: this.isSelected,
      processes: this.processes
    }

    s.serializedData = vdgi
    return s
  }

}
