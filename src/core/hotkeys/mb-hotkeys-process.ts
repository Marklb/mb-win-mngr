import { MBHotkeys, MBHotkeyEvent, MBHotkeysEnums, MBHotkeysConstants } from 'mb-hotkeys'

const mbHotkeys = new MBHotkeys()

declare const process: any

process.on('message', (msg) => {
  // console.log('Message from parent:', msg)
  if (msg.type === 'register_hotkey') {
    mbHotkeys.registerSequence(msg.accelerator, (event: MBHotkeyEvent) => {
      // console.log(`-== [${msg.accelerator}] ==-`)
      // console.log('event', event)
      process.send({ type: 'action', payload: msg })
    })
  } else if (msg.type === 'start_listening') {
    mbHotkeys.startListening()
  } else if (msg.type === 'stop_listening') {
    mbHotkeys.stopListening()
  }
})
