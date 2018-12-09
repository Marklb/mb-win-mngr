
// ./main.js
import { app, BrowserWindow } from 'electron'
// import path from 'path'
// import fs from 'fs'

import { WindowUrls } from './windows-manager'
import { Core } from './core'
// const { Injector } = require('./dist/core/shared/common/injector')

process.env['ELECTRON_DISABLE_SECURITY_WARNINGS'] = 'true'

let core

export const launch = () => {
  app.on('ready', () => {
    core = new Core
    // console.log(Core)
    // core = Injector.get(Core)
    core.init()
  })

  app.on('activate', () => {

  })

  app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
      app.quit()
    }
  })

}
