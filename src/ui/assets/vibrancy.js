// Loading this script like this because there is an issue causing it not to
// work when run from the main process and the angular compiler isn't loading
// the 'windows-swca' module.
(function() {
  const SetWindowCompositionAttribute = require('windows-swca').SetWindowCompositionAttribute
  const ACCENT_STATE = require('windows-swca').ACCENT_STATE

  const remote = require('electron').remote
  const win = remote.getCurrentWindow()

  const attribValue = ACCENT_STATE.ACCENT_ENABLE_ACRYLICBLURBEHIND
  const color = 0x01000000
  SetWindowCompositionAttribute(win.getNativeWindowHandle(), attribValue, color)
})()
