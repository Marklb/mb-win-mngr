// ./main.js
// import { WindowUrls } from './dist/core/core/windows-manager'
const { WindowUrls } = require('./dist/core/core/windows-manager')
const { app, BrowserWindow } = require('electron')
const path = require('path')
const fs = require('fs')

// require('electron-reload')(__dirname)

// global.__basedir = __dirname;

// E:/Git/mb-win-mngr/dist

// const content1 = fs.readFileSync('./dist/inline.bundle.js', 'utf8')
// const content2 = fs.readFileSync('./dist/polyfills.bundle.js', 'utf8')
// const content3 = fs.readFileSync('./dist/styles.bundle.js', 'utf8')
// const content4 = fs.readFileSync('./dist/vendor.bundle.js', 'utf8')
// const content5 = fs.readFileSync('./dist/main.bundle.js', 'utf8')

// const loadView = ({title,scriptUrl}) => {
//   // return (`
//   //   <!DOCTYPE html>
//   //   <html>
//   //     <head>
//   //       <title>${title}</title>
//   //       <meta charset="UTF-8">
//   //     </head>
//   //     <body>
//   //       <div id="view"></div>
//   //       <script src="${scriptUrl}"></script>
//   //     </body>
//   //   </html>
//   // `)

//   // <base href="E:/Git/mb-win-mngr/dist">
//   // <script type="text/javascript" src="inline.bundle.js"></script>
//   // <script type="text/javascript" src="polyfills.bundle.js"></script>
//   // <script type="text/javascript" src="styles.bundle.js"></script>
//   // <script type="text/javascript" src="vendor.bundle.js"></script>
//   // <script type="text/javascript" src="main.bundle.js"></script>
//   return (`
//   <!doctype html>
//   <html lang="en">
//   <head>
//     <meta charset="utf-8">
//     <title>${title}</title>

//     <meta name="viewport" content="width=device-width, initial-scale=1">
//     <link rel="icon" type="image/x-icon" href="favicon.ico">
//   </head>
//   <body>
//     <app-root></app-root>

//   </body>
//   </html>
//   `)
// }
// // <script type="text/javascript">${content1}</script>
// // <script type="text/javascript">${content2}</script>
// // <script type="text/javascript">${content3}</script>
// // <script type="text/javascript">${content4}</script>
// // <script type="text/javascript">${content5}</script>

// var file = 'data:text/html;charset=UTF-8,' + encodeURIComponent(loadView({
//   title: "Account",
//   scriptUrl: "./account.view.js"
// }));
// // window.loadURL(file);

const { Core } = require('./dist/core/core/core')

// let win = null

const core = new Core

app.on('ready', function () {
  core.windowsManager.openWindow(WindowUrls.DebugWindow)

  // const electronScreen = require('electron').screen
  // const size = electronScreen.getPrimaryDisplay().workAreaSize

  // // Initialize the window to our specified dimensions
  // win = new BrowserWindow({
  //   x: 0,
  //   y: 0,
  //   width: size.width,
  //   height: size.height,
  //   autoHideMenuBar: true
  //   // show: false
  // })

  // // Specify entry point
  // // win.loadURL('http://localhost:4200')
  // // win.loadURL(__dirname + '/dist/index.html')
  // // win.loadURL(__dirname + '/dist/index.html?page=4')
  // win.loadURL(__dirname + '/dist/index.html#/debug-panel')
  // // win.loadURL(__dirname + '/dist/index.html')

  // // win.loadURL(file);

  // // Show dev tools
  // // Remove this line before distributing
  // win.webContents.openDevTools()

  // // win.webContents.executeJavaScript(content1)
  // // win.webContents.executeJavaScript(content2)
  // // win.webContents.executeJavaScript(content3)
  // // win.webContents.executeJavaScript(content4)
  // // win.webContents.executeJavaScript(content5)

  // // win.once('ready-to-show', () => {
  // //   console.log('ready-to-show')
  // //   win.show()
  // //   // win.loadURL('/crisis-center')
  // //   // win.reload()
  // // })

  // // Remove window once app is closed
  // win.on('closed', function () {
  //   win = null
  // })

});

app.on('activate', () => {
  // if (win === null) {
  //   createWindow()
  // }
})

app.on('window-all-closed', function () {
  if (process.platform != 'darwin') {
    app.quit()
  }
})
