import * as winApi from 'mb-winapi-node'
const { ipcMain } = require('electron')

// console.log(winApi)

ipcMain.on('winapi:getProcesses', (event, arg) => {
  console.log('winapi:getProcesses')
  console.log(arg)
  // console.log(winApi.getProcesses())
  const procs = winApi.getProcesses()
  // winApi.getProcesses()
  event.sender.send('winapi:getProcessesReply', procs)
})

ipcMain.on('winapi:getAppUserModelIID', (event, arg) => {
  console.log('winapi:getAppUserModelIID')
  console.log(arg)
  // const appUserModelIID = winApi.getAppUserModelIID(arg.hWnd)
  // event.sender.send('winapi:getAppUserModelIIDReplay', appUserModelIID)

  winApi.getAppUserModelIID(arg.hWnd)
    .then(id => {
      console.log(id)
      event.sender.send('winapi:getAppUserModelIIDReply', id)
    })
})

ipcMain.on('winapi:setAppUserModelIID', (event, arg) => {
  console.log('winapi:setAppUserModelIID')
  console.log(arg)
  // const appUserModelIID = winApi.setAppUserModelIID(arg.hWnd)
  // event.sender.send('winapi:setAppUserModelIIDReplay', appUserModelIID)

  winApi.setAppUserModelIID(arg.hWnd, arg.appUserModelIID)
    .then(() => {
      event.sender.send('winapi:setAppUserModelIIDReply')
    })
})

ipcMain.on('winapi:test', (event, arg) => {
  // console.log(arg)
  // winApi.test()
})

export class Core {

  constructor() {
    console.log('init core')
  }

}

// winapi:getAppUserModelIID
// winapi:getAppUserModelIIDReplay
