// -----------------------------------------------------------------------------

menuLayoutDrum = {
}

// -----------------------------------------------------------------------------

menuLayoutDrum.enter = function () {
  launchpad.mute()
  display.clearSceneButtons(0x00)
  this.drawGrid()
}

// -----------------------------------------------------------------------------

menuLayoutDrum.onMidi = function (status, data1, data2) {
  var m = launchpad.screen.mode
  if (status === 0x90 && data2 > 0) {
    var y = display.padY(data1)
    if (y < 4) {
      launchpad.screen.mode.widePads = true
      launchpad.screen.mode.colors = drumColorSchemes[1]
    } else {
      launchpad.screen.mode.widePads = false
      launchpad.screen.mode.colors = drumColorSchemes[0]
    }
    this.drawGrid()
  }

  return ! (status === 0xb0 && data1 === 0x32 && data2 === 0x00)
}

// -----------------------------------------------------------------------------

menuLayoutDrum.drawGrid = function () {
  display.clearPads(0x00)
  var c = launchpad.screen.mode.widePads ? 0x03 : 0x01
  for (var y = 4; y < 8; y++) {
    for (var x = 0; x < 8; x++) {
      display.setPad(x, y, (x + y) % 2 === 0 ? c : 0x00)
    }
  }
  c = launchpad.screen.mode.widePads ? 0x01 : 0x03
  for (var y = 0; y < 4; y++) {
    for (var x = 0; x < 8; x++) {
      display.setPad(x, y, (Math.floor(x / 2) + y) % 2 === 0 ? c : 0x00)
    }
  }
}

// -----------------------------------------------------------------------------
// Copyright (c) 2015-2016 - Laurent Moussault <moussault.laurent@gmail.com>
