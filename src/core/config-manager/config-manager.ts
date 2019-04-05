import * as fs from 'fs-extra'
import * as path from 'path'
import { Observable, Subject } from 'rxjs'
import * as stripJsonComments from 'strip-json-comments'

import { Inject } from '../common/injector'
import { dataDir } from '../utilities'


@Inject
export class ConfigManager {

  configDirs: string[] = []
  config: any

  constructor() { }

  public async init(): Promise<any> {
    this.configDirs = [
      dataDir()
    ]

    const paths = await this.getConfigFilePaths()
    // console.log('paths', paths)
  }

  public async getConfigFilePaths(): Promise<string[]> {
    const dirs: string[] = []

    for (const dir of this.configDirs) {
      // console.log('dir', dir)
      dirs.push(...(await this._getConfigFilePaths(dir)))
    }

    return dirs
  }

  private async _getConfigFilePaths(dir: string): Promise<string[]> {
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



}
