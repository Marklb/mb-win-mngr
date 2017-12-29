const { app, BrowserWindow } = require('electron')

export class WindowUrls {
  public static DebugWindow: string = `${__dirname}/../../../dist/index.html#/debug-panel`
}

export class RegisteredWindowRef {
  public winId: number
  public winRef: Electron.BrowserWindow
}


export class WindowsManager {

  private _registeredWindows: RegisteredWindowRef[] = []

  constructor() { }

  public openWindow(windowUrl: string): any {
    console.log(windowUrl)
    const electronScreen = require('electron').screen
    const size = electronScreen.getPrimaryDisplay().workAreaSize

    const win = new BrowserWindow({
      x: 0,
      y: 0,
      width: Math.min(size.width, 2000),
      height: Math.min(size.height, 1200),
      autoHideMenuBar: true
      // show: false
    })

    win.loadURL(windowUrl)

    win.webContents.openDevTools()

    win.on('closed', () => {
      // win = null
      this._registeredWindows = this._registeredWindows.filter(item => item.winRef !== win)
    })

  }

}
