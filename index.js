// ./main.js
const { app, BrowserWindow } = require('electron')
const path = require('path')

// require('electron-reload')(__dirname)

const { Core } = require('./dist/core/core/core')

let win = null

app.on('ready', function () {
  const electronScreen = require('electron').screen
  const size = electronScreen.getPrimaryDisplay().workAreaSize

  // Initialize the window to our specified dimensions
  win = new BrowserWindow({
    x: 0,
    y: 0,
    width: size.width,
    height: size.height,
    autoHideMenuBar: true
  })

  // Specify entry point
  // win.loadURL('http://localhost:4200')
  win.loadURL(__dirname + '/dist/index.html')

  // Show dev tools
  // Remove this line before distributing
  // win.webContents.openDevTools()

  // Remove window once app is closed
  win.on('closed', function () {
    win = null
  })

});

app.on('activate', () => {
  if (win === null) {
    createWindow()
  }
})

app.on('window-all-closed', function () {
  if (process.platform != 'darwin') {
    app.quit()
  }
})
