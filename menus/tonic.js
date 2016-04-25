// -----------------------------------------------------------------------------

var menuTonic = {
  color: 0x08
}

// -----------------------------------------------------------------------------

menuTonic.enter = function () {
  launchpad.mute()
  display.clearPads(0x0)
  this.drawGrid()
}

// -----------------------------------------------------------------------------

menuTonic.onMidi = function (status, data1, data2) {
  if (status === 0x90 && data2 > 0) {
    switch (data1) {
      case 0x47: // C
      case 0x36:
        state.setTonic(0)
        break
      case 0x51: // C#
      case 0x0d:
        state.setTonic(1)
        break
      case 0x48: // D
      case 0x2e:
        state.setTonic(2)
        break
      case 0x52: // D#
      case 0x20:
        state.setTonic(3)
        break
      case 0x49: // E
      case 0x1a:
        state.setTonic(4)
        break
      case 0x4a: // F
      case 0x35:
        state.setTonic(5)
        break
      case 0x54: // F#
      case 0x0e:
        state.setTonic(6)
        break
      case 0x4b: // G
      case 0x37:
        state.setTonic(7)
        break
      case 0x55: // G#
      case 0x16:
        state.setTonic(8)
        break
      case 0x4c: // A
      case 0x24:
        state.setTonic(9)
        break
      case 0x56: // A#
      case 0x2a:
        state.setTonic(10)
        break
      case 0x4d: // B
      case 0x0f:
        state.setTonic(11)
        break
    }
  } else if (status === 0xb0 && data2 > 0) {
    if (data1 === 0x1e) {
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

menuTonic.drawGrid = function () {
  display.setPad(0, 7, this.color)
  display.setPad(1, 7, this.color)
  display.setPad(3, 7, this.color)
  display.setPad(4, 7, this.color)
  display.setPad(5, 7, this.color)
  for (var x = 0; x < 7; ++x) {
    display.setPad(x, 6, 0x1)
  }

  display.setPad(1 + 1, 4, 0x01)
  display.setPad(1 + 2, 4, 0x01)
  display.setPad(1 + 3, 4, 0x01)
  display.setPad(1 + 4, 3, 0x01)
  display.setPad(1 + 4, 2, 0x01)
  display.setPad(1 + 4, 1, 0x01)
  display.setPad(1 + 3, 0, 0x01)
  display.setPad(1 + 2, 0, this.color)
  display.setPad(1 + 1, 0, this.color)
  display.setPad(1 + 0, 1, this.color)
  display.setPad(1 + 0, 2, this.color)
  display.setPad(1 + 0, 3, this.color)

  switch (state.tonic) {
    case 0: // C
      display.setPad(0, 6, 0x2)
      display.setPad(1 + 2, 4, 0x2)
      break
    case 1: // C#
      display.setPad(0, 7, 0x2)
      display.setPad(1 + 1, 0, 0x2)
      break
    case 2: // D
      display.setPad(1, 6, 0x2)
      display.setPad(1 + 4, 3, 0x2)
      break
    case 3: // D#
      display.setPad(1, 7, 0x2)
      display.setPad(1 + 0, 2, 0x2)
      break
    case 4: // E
      display.setPad(2, 6, 0x2)
      display.setPad(1 + 4, 1, 0x2)
      break
    case 5: // F
      display.setPad(3, 6, 0x2)
      display.setPad(1 + 1, 4, 0x2)
      break
    case 6: // F#
      display.setPad(3, 7, 0x2)
      display.setPad(1 + 2, 0, 0x2)
      break
    case 7: // G
      display.setPad(4, 6, 0x2)
      display.setPad(1 + 3, 4, 0x2)
      break
    case 8: // G#
      display.setPad(4, 7, 0x2)
      display.setPad(1 + 0, 1, 0x2)
      break
    case 9: // A
      display.setPad(5, 6, 0x2)
      display.setPad(1 + 4, 2, 0x2)
      break
    case 10: // A#
      display.setPad(5, 7, 0x2)
      display.setPad(1 + 0, 3, 0x2)
      break
    case 11: // B
      display.setPad(6, 6, 0x2)
      display.setPad(1 + 3, 0, 0x2)
      break
  }
}

// -----------------------------------------------------------------------------
// Copyright (c) 2015-2016 - Laurent Moussault <moussault.laurent@gmail.com>
