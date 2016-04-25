// -----------------------------------------------------------------------------

var menuScale = {
  color: 0x07
}

// -----------------------------------------------------------------------------

menuScale.onMidi = function (status, data1, data2) {
  if (status === 0x90 && data2 > 0) {
    var x = display.padX(data1)
    var y = display.padY(data1)
    if (y >= 4) {
      if (scales[7 - y][x] != null) {
        launchpad.scale = scales[7 - y][x]
      }
    }
    this.drawGrid()
  } else if (status === 0xb0 && data2 > 0) {
    if (data1 === 0x14) {
      if (launchpad.scale === scales[0][0]) {
        launchpad.scale = scales[0][1]
        var t = modulo(state.tonic + 9, 12)
        state.setTonic(t)
      } else if (launchpad.scale === scales[0][1]) {
        launchpad.scale = scales[0][0]
        var t = modulo(state.tonic - 9, 12)
        state.setTonic(t)
      }
    }
  }
  return !(status === 0xb0 && data2 === 0x00)
}

// -----------------------------------------------------------------------------

menuScale.enter = function () {
  launchpad.mute()

  display.clearPads(0x0)

  this.drawGrid()
}

menuScale.drawGrid = function () {
  for (var x = 0; x < 8; x++) {
    for (var y = 0; y < 4; y++) {
      if (scales[y][x] != null) {
        var eq = true
        for (var i = 0; i < 12; i++) {
          if ((launchpad.scale.notes[i]) !== (scales[y][x].notes[i])) {
            eq = false
          }
        }
        display.setPad(x, 7 - y, eq ? colorSelectedOption : this.color)
      }
    }
  }

  if (true) {
    // Display the scale as bass guitar
    display.setPad(1 + 0, 0, 0x3)
    display.setPad(1 + 1, 0, launchpad.scale.notes[1] ? 0x01 : this.color)
    display.setPad(1 + 2, 0, launchpad.scale.notes[2] ? 0x01 : this.color)
    display.setPad(1 + 3, 0, launchpad.scale.notes[3] ? 0x01 : this.color)
    display.setPad(1 + 4, 0, launchpad.scale.notes[4] ? 0x01 : this.color)
    display.setPad(1 + 0, 1, launchpad.scale.notes[5] ? 0x01 : this.color)
    display.setPad(1 + 1, 1, launchpad.scale.notes[6] ? 0x01 : this.color)
    display.setPad(1 + 2, 1, launchpad.scale.notes[7] ? 0x01 : this.color)
    display.setPad(1 + 3, 1, launchpad.scale.notes[8] ? 0x01 : this.color)
    display.setPad(1 + 4, 1, launchpad.scale.notes[9] ? 0x01 : this.color)
    display.setPad(1 + 0, 2, launchpad.scale.notes[10] ? 0x01 : this.color)
    display.setPad(1 + 1, 2, launchpad.scale.notes[11] ? 0x01 : this.color)
    display.setPad(1 + 2, 2, 0x5)
  } else {
    // Display the scale on piano
    display.setPad(0, 0, 0x3)
    display.setPad(0, 1, launchpad.scale.notes[1] ? 0x01 : this.color)
    display.setPad(1, 0, launchpad.scale.notes[2] ? 0x01 : this.color)
    display.setPad(1, 1, launchpad.scale.notes[3] ? 0x01 : this.color)
    display.setPad(2, 0, launchpad.scale.notes[4] ? 0x01 : this.color)
    display.setPad(3, 0, launchpad.scale.notes[5] ? 0x01 : this.color)
    display.setPad(3, 1, launchpad.scale.notes[6] ? 0x01 : this.color)
    display.setPad(4, 0, launchpad.scale.notes[7] ? 0x01 : this.color)
    display.setPad(4, 1, launchpad.scale.notes[8] ? 0x01 : this.color)
    display.setPad(5, 0, launchpad.scale.notes[9] ? 0x01 : this.color)
    display.setPad(5, 1, launchpad.scale.notes[10] ? 0x01 : this.color)
    display.setPad(6, 0, launchpad.scale.notes[11] ? 0x01 : this.color)
    display.setPad(7, 0, 0x5)
  }
}

// -----------------------------------------------------------------------------
// Copyright (c) 2015-2016 - Laurent Moussault <moussault.laurent@gmail.com>
