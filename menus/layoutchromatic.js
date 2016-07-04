// -----------------------------------------------------------------------------

var menuLayoutChromatic = {
  color: 0x05
}

// -----------------------------------------------------------------------------

menuLayoutChromatic.enter = function () {
  launchpad.mute()
  display.clearSceneButtons(0x00)
  this.drawGrid()
}

// -----------------------------------------------------------------------------

menuLayoutChromatic.onMidi = function (status, data1, data2) {
  var m = launchpad.screen().mode()
  var dx = state.getChromaticDeltaX()
  var dy = state.getChromaticDeltaY()
  if (status === 0x90 && data2 > 0) {
    var x = display.padX(data1)
    var y = display.padY(data1)
    if (y < 5) {
      if (x < 4) {
        if (y < 2 && dx > 1) {
          dx = dx - 1
        } else if (y > 2 && dx < 8) {
          dx = dx + 1
        }
      } else {
        if (y < 2 && dy > 1) {
          dy = dy - 1
        } else if (y > 2 && dy < 8) {
          dy = dy + 1
        }
      }
    } else if (y === 7) {
      switch (x) {
        case 0:
          dx = 1
          dy = 5
          m.keyColors = keyColorSchemes[0]
          break
        case 1:
          dx = 1
          dy = 7
          m.keyColors = keyColorSchemes[0]
          break
        case 2:
          dx = 2
          dy = 5
          m.keyColors = keyColorSchemes[0]
          break
        case 4:
          dx = 4
          dy = 3
          m.keyColors = keyColorSchemes[1]
          break
        case 5:
          dx = 4
          dy = 7
          m.keyColors = keyColorSchemes[1]
          break
      }
    }
    state.setChromaticDeltaX(dx)
    state.setChromaticDeltaY(dy)
    this.drawGrid()
  }

  return ! (status === 0xb0 && data2 === 0x00)
}

// -----------------------------------------------------------------------------

menuLayoutChromatic.drawGrid = function () {
  display.clearPads(0x0)

  var m = launchpad.screen().mode()
  var dx = state.getChromaticDeltaX()
  var dy = state.getChromaticDeltaY()

  display.setPad(0, 7, dx === 1 && dy === 5 ? colorSelectedOption : this.color)
  display.setPad(1, 7, dx === 1 && dy === 7 ? colorSelectedOption : this.color)
  display.setPad(2, 7, dx === 2 && dy === 5 ? colorSelectedOption : this.color)
  display.setPad(4, 7, dx === 4 && dy === 3 ? colorSelectedOption : this.color)
  display.setPad(5, 7, dx === 4 && dy === 7 ? colorSelectedOption : this.color)

  if (dx >= 0) {
    display.drawBigNumber(0, 0, dx, this.color)
  } else {
    display.drawBigNumber(0, 0, -dx, 0x0b)
  }
  if (dy >= 0) {
    display.drawBigNumber(5, 0, dy, this.color)
  } else {
    display.drawBigNumber(5, 0, -dy, 0x0b)
  }
}

// -----------------------------------------------------------------------------
// Copyright (c) 2015-2016 - Laurent Moussault <moussault.laurent@gmail.com>
