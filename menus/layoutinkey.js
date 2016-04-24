// -----------------------------------------------------------------------------

menuLayoutInKey = {
}

// -----------------------------------------------------------------------------

menuLayoutInKey.enter = function () {
  launchpad.mute()
  display.clearSceneButtons(0x00)
  this.drawGrid()
}

// -----------------------------------------------------------------------------

menuLayoutInKey.onMidi = function (status, data1, data2) {
  var m = launchpad.screen.mode
  if (status === 0x90 && data2 > 0) {
    var x = display.padX(data1)
    var y = display.padY(data1)
    if (y < 5) {
      if (x < 4) {
        if (y < 2 && m.deltaX > 1) {
          m.deltaX = m.deltaX - 1
        } else if (y > 2 && m.deltaX < 8) {
          m.deltaX = m.deltaX + 1
        }
      } else {
        if (y < 2 && m.deltaY > 1) {
          m.deltaY = m.deltaY - 1
        } else if (y > 2 && m.deltaY < 8) {
          m.deltaY = m.deltaY + 1
        }
      }
    } else if (y === 7) {
      switch (x) {
        case 0:
          m.deltaX = 1
          m.deltaY = 3
          m.keyColors = keyColorSchemes[0]
          break
        case 4:
          m.deltaX = 2
          m.deltaY = 3
          m.keyColors = keyColorSchemes[1]
          break
      }
    }
    this.drawGrid()
  } else if (status === 0xb0 && data2 > 0) {
    switch (data1) {
      case 0x59:
        launchpad.screen.mode.keyColors = keyColorSchemes[0]
        break
      case 0x4f:
        launchpad.screen.mode.keyColors = keyColorSchemes[1]
        break
      case 0x45:
        launchpad.screen.mode.keyColors = keyColorSchemes[2]
        break
    }
    this.drawGrid()
  }

  return ! (status === 0xb0 && data1 === 0x32 && data2 === 0x00)
}

// -----------------------------------------------------------------------------

menuLayoutInKey.drawGrid = function () {
  var kc = launchpad.screen.mode.keyColors
  display.setSceneButton(0, kc === keyColorSchemes[0] ? 0x12 : 0x13)
  display.setSceneButton(1, kc === keyColorSchemes[1] ? 0x12 : 0x13)
  display.setSceneButton(2, kc === keyColorSchemes[2] ? 0x12 : 0x13)

  display.clearPads(0x0)

  var m = launchpad.screen.mode

  display.setPad(0, 7, m.deltaX === 1 && m.deltaY === 3 ? colorSelectedOption : 0x03)
  display.setPad(4, 7, m.deltaX === 2 && m.deltaY === 3 ? colorSelectedOption : 0x03)

  if (m.deltaX >= 0) {
    display.drawBigNumber(0, 0, m.deltaX, 0x03)
  } else {
    display.drawBigNumber(0, 0, -m.deltaX, 0x0b)
  }
  if (m.deltaY >= 0) {
    display.drawBigNumber(5, 0, m.deltaY, 0x03)
  } else {
    display.drawBigNumber(5, 0, -m.deltaY, 0x0b)
  }
}

// -----------------------------------------------------------------------------
// Copyright (c) 2015-2016 - Laurent Moussault <moussault.laurent@gmail.com>
