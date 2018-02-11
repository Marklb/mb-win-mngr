import { Core } from '../core'
import * as fs from 'fs-extra'
import * as stripJsonComments from 'strip-json-comments'
import { IExtension } from './extension'
import 'reflect-metadata'
import { Injector } from '../../shared/common/injector'

export class ExtensionManager {

  private _loadedExtensions: IExtension[] = []

  constructor(private core: Core,
              private extensions: any[]) {
  }

  public async loadExtensions(): Promise<any> {
    // console.log('ExtensionManager: Start loading extensions')
    for (const extEntry of this.extensions) {
      const ext: IExtension = new (<any>extEntry)()
      // const ext: IExtension = Injector.get(extEntry)
      try {
        ext.extensionConfig = await this.getConfig(ext)
      } catch (e) {
        console.log('error: ', e)
      }
      ext.initialize()
      this._loadedExtensions.push(ext)
    }
    // console.log('ExtensionManager: Done loading extensions')
  }

  private async getConfig(ext: IExtension): Promise<any> {
    const res = await fs.readFile(ext.extensionConfigPath, 'utf8')
    return JSON.parse(stripJsonComments(res))
  }

}
