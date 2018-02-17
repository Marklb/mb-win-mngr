import { IpcSerializable, IpcSerializationObj } from '../../../shared/ipc/ipc-common'
import { VirtualDesktopGroupInfo, VirtualDesktopProcessGroupInfo } from './virtual-desktop-common'


export class VirtualDesktopGroup implements IpcSerializable {

  public groupName: string

  constructor() { }

  /**
   *
   */
  public ipcSerialize(): IpcSerializationObj {
    const s = new IpcSerializationObj

    const vdpgi: VirtualDesktopProcessGroupInfo[] = []

    const vdgi = {
      groupName: this.groupName,
      processes: vdpgi
    } as VirtualDesktopGroupInfo

    s.serializedData = vdgi
    return s
  }

}
