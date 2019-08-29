
import { app } from 'electron'

import { Core } from './core'

process.env['ELECTRON_DISABLE_SECURITY_WARNINGS'] = 'true'

let core: Core

export const launch = () => {
  app.on('ready', () => {
    core = new Core()
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
