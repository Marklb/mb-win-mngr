
// ./main.js
const { app, BrowserWindow } = require('electron')
const path = require('path')
const fs = require('fs')

const { WindowUrls } = require('./dist/core/core/windows-manager')
const { Core } = require('./dist/core/core/core')
// const { Injector } = require('./dist/core/shared/common/injector')

let core

app.on('ready', () => {
  core = new Core
  // console.log(Core)
  // core = Injector.get(Core)
  core.init()
})

app.on('activate', () => {

})

app.on('window-all-closed', () => {
  if (process.platform != 'darwin') {
    app.quit()
  }
})
