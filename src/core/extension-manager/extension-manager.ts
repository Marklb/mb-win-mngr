import * as fs from 'fs-extra'
import * as path from 'path'

import 'reflect-metadata'
import * as stripJsonComments from 'strip-json-comments'
import { Injector } from '../common/injector'
import { Core } from '../core'
import { IExtension } from './extension'



// const tsConfig = require('../../../tsconfig.json')
const tsConfigPaths = require('tsconfig-paths')

const baseUrl = './' // Either absolute or relative path. If relative it's resolved to current working directory.

// const cleanup = tsConfigPaths.register({
//   baseUrl,
//   // paths: tsConfig.compilerOptions.paths
//   paths: {
//     '@win-mngr/core': [
//       './dist/core'
//     ],
//     '@win-mngr/core/*': [
//       './dist/core/*'
//     ],

//     '@win-mngr/ui': [
//       './dist/ui'
//     ],
//     '@win-mngr/ui/*': [
//       './dist/ui/*'
//     ],

//     '@win-mngr/ui-libs': [
//       './dist/ui-libs'
//     ],
//     '@win-mngr/ui-libs/*': [
//       './dist/ui-libs/*'
//     ],

//     '@win-mngr/extensions': [
//       './dist/extensions'
//     ],
//     '@win-mngr/extensions/*': [
//       './dist/extensions/*'
//     ]
//   }
// })

// When path registration is no longer needed
// cleanup()


export const EXTENSIONS_DIR = 'E:/Git/mb-win-mngr/src/extensions'

export class ExtensionManager {

  private _loadedExtensions: IExtension[] = []

  constructor(private core: Core,
              private extensions: any[]) {
  }

  public async loadExtensions(): Promise<any> {
    const extDirs = await this.getExtensionDirectories(EXTENSIONS_DIR)
    console.log(extDirs)

    const cleanup = this.patchPaths()
    const _tmpPath = `${EXTENSIONS_DIR}/processes-list/dist/out-tsc/extensions/processes-list/src/main/processes-list.extension.js`
    console.log('_tmpPath', _tmpPath)
    const _tmpExt = require(_tmpPath)
    console.log(_tmpExt)
    console.log(_tmpExt.extension)
    // const _ext = new _tmpExt.extension()
    // _ext.initialize()
    this.extensions.push(_tmpExt.extension)
    cleanup()

    console.log('ExtensionManager1: Start loading extensions')
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
    console.log('ExtensionManager1: Done loading extensions')
  }

  public async ready(): Promise<any> {
    console.log('Ready!!', this._loadedExtensions.length)
    for (const ext of this._loadedExtensions) {
      console.log('Start Extension: ', ext.extensionName)
      ext.ready()
    }
  }

  private async getConfig(ext: IExtension): Promise<any> {
    const res = await fs.readFile(ext.extensionConfigPath, 'utf8')
    return JSON.parse(stripJsonComments(res))
  }

  private async getExtensionDirectories(dir: string): Promise<string[]> {
    const dirs: string[] = []

    const files = await fs.readdir(dir)
    for (const file of files) {
      const filepath = path.join(dir, file)
      const stat = await fs.stat(filepath)

      if (stat.isDirectory()) {
        dirs.push(file)
      }
    }

    return dirs
  }

  private patchPaths() {
    return tsConfigPaths.register({
      baseUrl,
      // paths: tsConfig.compilerOptions.paths
      paths: {
        '@win-mngr/core': [
          './dist/core'
        ],
        '@win-mngr/core/*': [
          './dist/core/*'
        ],

        '@win-mngr/ui': [
          './dist/ui'
        ],
        '@win-mngr/ui/*': [
          './dist/ui/*'
        ],

        '@win-mngr/ui-libs': [
          './dist/ui-libs'
        ],
        '@win-mngr/ui-libs/*': [
          './dist/ui-libs/*'
        ],

        '@win-mngr/extensions': [
          './dist/extensions'
        ],
        '@win-mngr/extensions/*': [
          './dist/extensions/*'
        ]
      }
    })
  }

}
