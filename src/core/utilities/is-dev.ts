import * as electron from 'electron'

const app = electron.app || electron.remote.app

const isEnvSet = 'WIN_MNGR_DEV' in process.env
const getFromEnv = parseInt(process.env.WIN_MNGR_DEV, 10) === 1

export function isDev(): boolean {
  return isEnvSet ? getFromEnv : !app.isPackaged
}
