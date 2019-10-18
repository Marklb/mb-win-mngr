import { ProxyPropertyType } from '@marklb/electron-ipc-proxy'
import { WinApiTypes } from '@win-mngr/core/utilities'
import { Observable } from 'rxjs'

export const processListServiceDescriptor = {
    channel: 'processListService',
    properties: {
      processes: ProxyPropertyType.Function$
    }
}

export interface IProcessesListService {

  processes: () => Observable<WinApiTypes.Window[]>

}
