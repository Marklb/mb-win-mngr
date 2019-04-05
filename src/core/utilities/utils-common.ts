import { app } from 'electron'

export const toRouteUrl = (url: string) => {
  // TODO: Fix this
  // return app.getAppPath() + url
  return 'file:///E:/Git/mb-win-mngr/dist/renderer/index.html#/' + url
}

export const extensionsPath = () => {
  return 'E:/Git/mb-win-mngr/src/extensions'
}

export function dataDir(): string {
  // TODO: Allow command line and environment variable to override dataDir
  return app.getPath('userData')
}
