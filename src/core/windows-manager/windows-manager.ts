import { app, BrowserWindow } from 'electron'
import { Inject } from '../common/injector'
import { WindowUrls } from './windows-manager-utils'

export class RegisteredWindowRef {
  public winId: number
  public winRef: Electron.BrowserWindow
}

@Inject
export class WindowsManager {

  private _registeredWindows: RegisteredWindowRef[] = []

  constructor() { }

  public openWindow(windowUrl: string, options: Electron.BrowserWindowConstructorOptions): Electron.BrowserWindow {
    console.log(windowUrl)
    const electronScreen = require('electron').screen
    const size = electronScreen.getPrimaryDisplay().workAreaSize

    const opts = Object.assign({
      x: 0,
      y: 0,
      width: Math.min(size.width, 2000),
      height: Math.min(size.height, 1200),
      backgroundColor: '#1c1c1d',
      autoHideMenuBar: true,
      // show: false
    }, options)

    const win = new BrowserWindow(opts)

    win.loadURL(windowUrl)

    // win.webContents.executeJavaScript(`
    //   (function(){
    //     const script = document.createElement('script')
    //     script.src = './assets/vibrancy.js'
    //     document.body.appendChild(script)
    //     console.log('Vibrancy script injected.')
    //   })()
    // `)

    // win.webContents.openDevTools()

    win.on('closed', () => {
      // win = null
      this._registeredWindows = this._registeredWindows.filter(item => item.winRef !== win)
    })

    return win
  }

}
