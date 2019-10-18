import { ProxyPropertyType, registerProxy } from 'electron-ipc-proxy'

interface IRegisteredProxyRecord {
  name: string
  channel: string
  properties: { [propKey: string]: ProxyPropertyType }
}

const _registered: { [name: string]: IRegisteredProxyRecord } = {}

export function registerIpcProxy(name: string, channel: string) {
  if (_registered[name]) {
    _registered[name].name = name
    _registered[name].channel = `Proxy::${channel || name}`
  } else {
    _registered[name] = {
      name: name,
      channel: `Proxy::${channel || name}`,
      properties: {}
    }
  }
}

export function registerIpcProxyProp(name: string, propertyName: string, propertyType: ProxyPropertyType) {
  if (!_registered[name]) {
    _registered[name] = {
      name: name,
      channel: `Proxy::${name}`,
      properties: {}
    }
  }
  _registered[name].properties[propertyName] = propertyType
}

class IpcProxies {

  constructor() { }

  public logDescriptors() {
    console.log('----------logDescriptors')
  }

}

export const ipcProxies = new IpcProxies()

const ipcProxiesDescriptor = {
  channel: '__ipcProxies__',
  properties: {
    logDescriptors: ProxyPropertyType.Function
  }
}
registerProxy(ipcProxies, ipcProxiesDescriptor)
