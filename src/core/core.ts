import * as winApi from 'mb-winapi-node'
const { ipcMain } = require('electron')

console.log(winApi)

ipcMain.on('winapi:getProcesses', (event, arg) => {
  console.log('winapi:getProcesses')
  console.log(arg)
  // console.log(winApi.utils.getProcesses())
  // const procs = winApi.getProcesses()
  // winApi.getProcesses()
  // event.sender.send('winapi:getProcessesReply', procs)
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
