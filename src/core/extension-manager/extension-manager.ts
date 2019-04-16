import * as fs from 'fs-extra'
import * as path from 'path'

import * as c from 'ansi-colors'
import * as readJson from 'read-package-json'
import 'reflect-metadata'
import * as stripJsonComments from 'strip-json-comments'

import { Injector } from '../common/injector'
import { Core } from '../core'
import { Logger } from './../logger'
import { extensionsPath } from './../utilities/utils-common'
import { IExtension } from './extension'

const tsConfigPaths = require('tsconfig-paths')

export interface IExtensionLocationRef {
  dir: string
  path: string
  name: string
}

export class ExtensionManager {

  private _loadedExtensions: IExtension[] = []

  constructor(
    private core: Core,
    private extensions: any[],
    private logger: Logger
  ) { }

  public async loadExtensions(): Promise<any> {
    const extRefs = await this.getExtensionLocationRefs()
    this._logExtRefs(extRefs)

    for (const ref of extRefs) {
      await this.loadExtension(ref)
    }
  }

  public async ready(): Promise<any> {
    this.logger.info(c.cyan(`Ready up loaded extensions. (Count: ${c.green(this._loadedExtensions.length.toString())})`))
    for (const ext of this._loadedExtensions) {
      this.logger.info(c.cyan('Ready Extension: '), ext.extensionName)
      ext.ready()
    }
  }

  private async getConfig(ext: IExtension): Promise<any> {
    const res = await fs.readFile(ext.extensionConfigPath, 'utf8')
    return JSON.parse(stripJsonComments(res))
  }

  private async loadExtension(ref: IExtensionLocationRef) {
    const pkgJson = await this.getExtensionPackageJson(ref)
    const mainPath = path.join(ref.path, pkgJson['main'])
    await this.loadExtensionMain(mainPath)
  }

  private async loadExtensionMain(mainPath: string) {
    const cleanup = this.patchPaths()

    const extMain = require(mainPath)
    const ext: IExtension = new (<any>extMain.extension)()
    try {
      ext.extensionConfig = await this.getConfig(ext)
    } catch (e) {
      this.logger.error(e)
    }
    ext.initialize()
    this._loadedExtensions.push(ext)

    cleanup()
  }

  private async getExtensionPaths(): Promise<string[]> {
    return [
      extensionsPath()
    ]
  }

  private async getExtensionDirectoryNames(dir: string): Promise<string[]> {
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

  private async getExtensionLocationRefs(): Promise<IExtensionLocationRef[]> {
    const extRefs: IExtensionLocationRef[] = []

    const extPaths = await this.getExtensionPaths()
    for (const p of extPaths) {
      const extNames = await this.getExtensionDirectoryNames(p)
      for (const name of extNames) {
        const fullPath = path.join(p, name)
        if (this.isValidExtensionDir(path.join(fullPath, 'package.json'))) {
          extRefs.push({
            dir: p,
            path: fullPath,
            name: name
          })
        }
      }
    }

    return extRefs
  }

  private isValidExtensionDir(dir: string): boolean {
    return fs.existsSync(dir)
  }

  private async getExtensionPackageJson(ref: IExtensionLocationRef) {
    return new Promise((resolve, reject) => {
      readJson(path.join(ref.path, 'package.json'), console.error, false, (err, data) => {
        if (err) {
          this.logger.error('There was an error reading the file')
          reject(err)
          return
        }

        resolve(data)
      })
    })
  }

  private _logExtRefs(extRefs: IExtensionLocationRef[]): void {
    this.logger.info(c.cyan('Extensions:'))
    for (const ref of extRefs) {
      this.logger.info(`${c.yellow('[')} ${c.cyan(ref.name)} : ${c.cyan(ref.path)} ${c.yellow(']')}`)
    }
  }

  private patchPaths(baseUrl = './') {
    return tsConfigPaths.register({
      baseUrl,
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
