import { Injectable } from '@angular/core'
import { createProxy, ProxyPropertyType } from '@marklb/electron-ipc-proxy/dist/client'
import { Observable } from 'rxjs'

const ipcProxiesDescriptor = {
  channel: '__ipcProxies__',
  properties: {
    logDescriptors: ProxyPropertyType.Function
  }
}
const ipcProxies: any = createProxy(ipcProxiesDescriptor, Observable)

@Injectable({ providedIn: 'root' })
export class IpcProxyService {

  constructor() { }

  public logDescriptors() {
    ipcProxies.logDescriptors()
  }

}
