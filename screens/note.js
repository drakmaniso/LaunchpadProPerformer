// -----------------------------------------------------------------------------

function ScreenNote () {
  this.modes = new Array(4)
  this.modes[0] = new ModeChromatic()
  this.modes[1] = new ModeDrum()
  this.modes[2] = new ModeInKey()
  this.modes[3] = new ModeChords()
  this.mode = this.modes[0]
}

// -----------------------------------------------------------------------------

ScreenNote.prototype.enter = function () {
  launchpad.unbindMenus()
  launchpad.bindMenu(1, menuMode)
  launchpad.bindMenu(4, menuScale)
  launchpad.bindMenu(5, menuTonic)
  display.clearSceneButtons(0x11)
  this.mode.enter()
}

// -----------------------------------------------------------------------------

ScreenNote.prototype.onMidi = function (status, data1, data2) {
  return this.mode.onMidi(status, data1, data2)
}

// -----------------------------------------------------------------------------
// Copyright (c) 2015-2016 - Laurent Moussault <moussault.laurent@gmail.com>
