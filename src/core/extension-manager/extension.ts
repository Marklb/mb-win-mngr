import 'reflect-metadata'
import { Injector } from '../common/injector'

export interface IExtensionOptions {
  name?: string
}

export interface IExtension {
  extensionId: string
  extensionName: string
  extensionConfig: any
  extensionConfigPath: string
  initialize(): void
  ready(): void
  destroy(): void
}

export function Extension(extensionOptions: IExtensionOptions): any {
  return (target: () => void): any => {
    // console.log('extensionOptions', extensionOptions, target)
    return Injector.inject((<any>target))


    // Injector.inject((<any>target))

    // const original = target
    // // const original = Injector.inject((<any>target))

    // function construct(constructor, args): any {
    //   const c: any = function(): any {

    //     return constructor.apply(this, args)
    //   }

    //   c.prototype = constructor.prototype

    //   const api: IExtension = new c()

    //   return api
    // }

    // const f: any = function(...args): any {
    //   return construct(original, args)
    // }

    // f.prototype = original.prototype

    // // // Injector.inject((<any>f))
    // return f
    // // return Injector.inject(f)
  }
}
