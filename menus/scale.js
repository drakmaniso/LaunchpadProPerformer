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
        state.setScale(scales[7 - y][x].notes)
      }
    }
    this.drawGrid()
  } else if (status === 0xb0 && data2 > 0) {
    if (data1 === 0x14) {
      if (scalesAreEquals(state.scale, scaleMajor)) {
        state.setScale("1_23_4_56_7_")
        var t = modulo(state.tonic + 9, 12)
        state.setTonic(t)
      } else if (scalesAreEquals(state.scale, scaleMinor)) {
        state.setScale("1_2_34_5_6_7")
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
          if ((state.scale[i]) !== (scales[y][x].notes.charAt(i) !== "_" )) {
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
    display.setPad(1 + 1, 0, state.scale[1] ? 0x01 : this.color)
    display.setPad(1 + 2, 0, state.scale[2] ? 0x01 : this.color)
    display.setPad(1 + 3, 0, state.scale[3] ? 0x01 : this.color)
    display.setPad(1 + 4, 0, state.scale[4] ? 0x01 : this.color)
    display.setPad(1 + 0, 1, state.scale[5] ? 0x01 : this.color)
    display.setPad(1 + 1, 1, state.scale[6] ? 0x01 : this.color)
    display.setPad(1 + 2, 1, state.scale[7] ? 0x01 : this.color)
    display.setPad(1 + 3, 1, state.scale[8] ? 0x01 : this.color)
    display.setPad(1 + 4, 1, state.scale[9] ? 0x01 : this.color)
    display.setPad(1 + 0, 2, state.scale[10] ? 0x01 : this.color)
    display.setPad(1 + 1, 2, state.scale[11] ? 0x01 : this.color)
    display.setPad(1 + 2, 2, 0x5)
  } else {
    // Display the scale on piano
    display.setPad(0, 0, 0x3)
    display.setPad(0, 1, state.scale[1] ? 0x01 : this.color)
    display.setPad(1, 0, state.scale[2] ? 0x01 : this.color)
    display.setPad(1, 1, state.scale[3] ? 0x01 : this.color)
    display.setPad(2, 0, state.scale[4] ? 0x01 : this.color)
    display.setPad(3, 0, state.scale[5] ? 0x01 : this.color)
    display.setPad(3, 1, state.scale[6] ? 0x01 : this.color)
    display.setPad(4, 0, state.scale[7] ? 0x01 : this.color)
    display.setPad(4, 1, state.scale[8] ? 0x01 : this.color)
    display.setPad(5, 0, state.scale[9] ? 0x01 : this.color)
    display.setPad(5, 1, state.scale[10] ? 0x01 : this.color)
    display.setPad(6, 0, state.scale[11] ? 0x01 : this.color)
    display.setPad(7, 0, 0x5)
  }
}

// -----------------------------------------------------------------------------
// Copyright (c) 2015-2016 - Laurent Moussault <moussault.laurent@gmail.com>
