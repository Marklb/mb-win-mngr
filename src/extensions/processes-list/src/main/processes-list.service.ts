import { ProxyPropertyType } from '@marklb/electron-ipc-proxy'
import { IpcProxyProp, IpcProxyService, registerIpcProxy } from '@win-mngr/core/ipc/proxy'
import { WinApiTypes } from '@win-mngr/core/utilities'
import * as winApiUtils from '@win-mngr/core/utilities/win-api-utils'
import { from, Observable } from 'rxjs'

@IpcProxyService()
export class ProcessesListService {

  constructor() { console.log('[ProcessesListService]:: Inside') }

  @IpcProxyProp(ProxyPropertyType.Function$)
  public processes(): Observable<WinApiTypes.Window[]> {
    return from(winApiUtils.getWindows())
  }

}
