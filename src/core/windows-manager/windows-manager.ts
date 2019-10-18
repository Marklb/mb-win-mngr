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
      webPreferences: {
        experimentalFeatures: true
      }
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

    //
    // Alternative because of acrylic bug in non-uwp windows.
    //
    win.webContents.executeJavaScript(`
      (function(){
        document.body.style.backgroundColor = 'rgba(30,30,30,0.9)'
        console.log('Vibrancy[ALTERNATIVE] script injected.')
      })()
    `)

    win.webContents.executeJavaScript(`
      (function(){
        window.__createProxy = require('electron-ipc-proxy/src/client')
        console.log('ipc script injected.')
        console.log(window.__createProxy)
      })()
    `)

    // win.webContents.openDevTools()

    win.on('closed', () => {
      // win = null
      this._registeredWindows = this._registeredWindows.filter(item => item.winRef !== win)
    })

    return win
  }

}
