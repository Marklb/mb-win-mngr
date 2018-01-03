
// ./main.js
const { app, BrowserWindow } = require('electron')
const path = require('path')
const fs = require('fs')

const { WindowUrls } = require('./dist/core/core/windows-manager')
const { Core } = require('./dist/core/core/core')

let core

app.on('ready', () => {
  core = new Core
  core.init()
})

app.on('activate', () => {

})

app.on('window-all-closed', () => {
  if (process.platform != 'darwin') {
    app.quit()
  }
})
