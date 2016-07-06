// -----------------------------------------------------------------------------

var menuMode = {
  color: 0x07
}

// -----------------------------------------------------------------------------

menuMode.enter = function () {
  launchpad.mute()
  display.clearPads(0x0)
  this.drawGrid()
}

// -----------------------------------------------------------------------------

menuMode.onMidi = function (status, data1, data2) {
  if (status === 0x90 && data2 > 0) {
    var x = display.padX(data1)
    var y = display.padY(data1)
    if (y >= 4) {
      if (x < 4) {
        state.setMode(0)
      } else {
        state.setMode(1)
      }
    } else {
      if (x < 4) {
        state.setMode(2)
      } else {
        state.setMode(3)
      }
    }
  }

  return !(status === 0xb0 && data2 === 0x00)
}

// -----------------------------------------------------------------------------

menuMode.drawGrid = function () {
  var c

  // Chromatic Mode
  if (launchpad.screen().mode() === launchpad.screen().modes[0]) {
    c = colorSelectedOption
  } else {
    c = this.color
  }
  display.setPad(1, 7, c)
  display.setPad(2, 7, c)
  display.setPad(0, 6, c)
  display.setPad(0, 5, c)
  display.setPad(1, 4, c)
  display.setPad(2, 4, c)

  // Drums Mode
  if (launchpad.screen().mode() === launchpad.screen().modes[1]) {
    c = colorSelectedOption
  } else {
    c = this.color
  }
  display.setPad(5, 7, c)
  display.setPad(6, 7, c)
  display.setPad(5, 6, c)
  display.setPad(7, 6, c)
  display.setPad(5, 5, c)
  display.setPad(7, 5, c)
  display.setPad(5, 4, c)
  display.setPad(6, 4, c)

  // In Key Mode
  if (launchpad.screen().mode() === launchpad.screen().modes[2]) {
    c = colorSelectedOption
  } else {
    c = this.color
  }
  display.setPad(0, 2, c)
  display.setPad(2, 2, c)
  display.setPad(0, 1, c)
  display.setPad(1, 1, c)
  display.setPad(0, 0, c)
  display.setPad(2, 0, c)

  // Chords Mode
  if (launchpad.screen().mode() === launchpad.screen().modes[3]) {
    c = colorSelectedOption
  } else {
    c = this.color
  }
  display.setPad(5, 2, c)
  display.setPad(7, 2, c)
  display.setPad(5, 1, c)
  display.setPad(6, 1, c)
  display.setPad(7, 1, c)
  display.setPad(5, 0, c)
  display.setPad(7, 0, c)
}

// -----------------------------------------------------------------------------
// Copyright (c) 2015-2016 - Laurent Moussault <moussault.laurent@gmail.com>
