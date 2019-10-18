import { ProxyPropertyType } from 'electron-ipc-proxy'
import { registerIpcProxyProp } from './ipc-proxy'

export function IpcProxyProp(type: ProxyPropertyType) {
  return (target, propertyKey, descriptor) => {
    const className = target.constructor.name
    registerIpcProxyProp(className, propertyKey, type)
  }
}
