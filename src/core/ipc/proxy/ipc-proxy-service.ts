import { registerIpcProxy } from './ipc-proxy'

interface IIpcProxyMeta {
  channel?: string
}

export function IpcProxyService(meta: IIpcProxyMeta = {}) {
  return (targetCtor: any) => {
    const original = targetCtor

    function construct(constructor, args) {
      const c: any = function() {
        return constructor.apply(this, args)
      }
      c.prototype = constructor.prototype
      return new c()
    }

    // const f: any = (...args) => {
    //   console.log('New: ' + original.name)
    //   return construct(original, args)
    // }

    // tslint:disable-next-line: only-arrow-functions
    const f: any = function() {
      const args = []
      for (let _i = 0; _i < arguments.length; _i++) {
          args[_i] = arguments[_i]
      }
      console.log('New: ' + original.name)
      return construct(original, args)
    }

    f.prototype = original.prototype

    // console.log('f', f)
    registerIpcProxy(targetCtor.name, (meta && meta.channel) || targetCtor.name)

    return f
  }
}
