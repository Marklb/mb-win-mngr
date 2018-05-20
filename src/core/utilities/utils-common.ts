import { app } from 'electron'

export const toRouteUrl = (url: string) => {
  // TODO: Fix this
  // return app.getAppPath() + url
  return 'file:///E:/Git/mb-win-mngr/dist/renderer/index.html#/' + url
}
