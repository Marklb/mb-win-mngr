import { Core } from '../core'

// https://stackoverflow.com/questions/41017287/cannot-use-new-with-expression-typescript

export interface IExtension {
  extensionId: string
  extensionName: string
  initialize(): void
  destroy(): void
}

export class ExtensionManager {

  private _loadedExtensions: IExtension[] = []

  constructor(private core: Core,
              private extensions: any[]) {
    console.log('ExtensionManager: Start loading extensions')
    for (const extEntry of extensions) {
      const ext: IExtension = new (<any>extEntry)(core)
      ext.initialize()
      this._loadedExtensions.push(ext)
    }
    console.log('ExtensionManager: Done loading extensions')
  }

}
