import * as winApi from 'mb-winapi-node'
import { Process } from '../models/process'
const { ipcMain } = require('electron')
const robotjs = require ('robot-js')

// console.log(winApi)

ipcMain.on('winapi:getProcesses', (event, arg) => {
  console.log('winapi:getProcesses')
  console.log(arg)
  // console.log(winApi.getProcesses())
  const procs = winApi.getProcesses()
  // winApi.getProcesses()

  // console.log(robotjs)
  // console.log(robotjs.Window.getList())
  // const procs2 = robotjs.Process.getList()
  // // console.log(procs2)
  // for (const p of procs2) {
  //   console.log(p)
  //   console.log(p.getName())
  // }

  const procs2 = []

  const wins = robotjs.Window.getList()
  for (const w of wins) {
    console.log(w.getTitle())
    const win = {
      hWnd: w.getHandle(),
      pid: w.getPID(),
      title: w.getTitle()
    } as Process
    procs2.push(win)
  }
  console.log('---')
  console.log(procs2)

  // event.sender.send('winapi:getProcessesReply', procs)
  event.sender.send('winapi:getProcessesReply', procs2)
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
