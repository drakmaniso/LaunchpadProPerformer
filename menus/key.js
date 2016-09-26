// -----------------------------------------------------------------------------

var menuKey = {
  color: 0x05,
  page: 0
}

// -----------------------------------------------------------------------------

menuKey.enter = function () {
  launchpad.mute()
  display.clearPads(0x0)
  display.clearSceneButtons(0x10)
  this.drawGrid()
}

// -----------------------------------------------------------------------------

menuKey.onMidi = function (status, data1, data2) {
  if (status === 0x90 && data2 > 0) {

    var x = display.padX(data1)
    var y = display.padY(data1)
    if (x >= 6) {
      if (scales[this.page][2 * (7 - y) + x - 6] != null) {
        state.setScale(scales[this.page][2 * (7 - y) + x - 6].notes)
      }
    }

    switch (data1) {
      case 0x53: // C
        state.setTonic(0)
        break
      case 0x2a: // C#
        state.setTonic(1)
        break
      case 0x4b: // D
        state.setTonic(2)
        break
      case 0x3d: // D#
        state.setTonic(3)
        break
      case 0x37: // E
        state.setTonic(4)
        break
      case 0x52: // F
        state.setTonic(5)
        break
      case 0x2b: // F#
        state.setTonic(6)
        break
      case 0x54: // G
        state.setTonic(7)
        break
      case 0x33: // G#
        state.setTonic(8)
        break
      case 0x41: // A
        state.setTonic(9)
        break
      case 0x47: // A#
        state.setTonic(10)
        break
      case 0x2c: // B
        state.setTonic(11)
        break
      case 0x3f: // relative minor/major
        if (scalesAreEquals(state.scale, scaleMajor)) {
        }
        //TODO
        break
    }
  } else if (status === 0xb0 && data2 > 0) {
    // println(byteToHexString(data1))
    switch (data1) {
      case 0x59:
        this.page = 0
        break
      case 0x4f:
        this.page = 1
        break
      case 0x45:
        this.page = 2
        break
      case 0x3b:
        this.page = 3
        break
      case 0x31:
        this.page = 4
        break
      case 0x27:
        this.page = 5
        break
      case 0x1d:
        this.page = 6
        break
      case 0x13:
        this.page = 7
        break
    }
    display.clearPads(0x0)
    this.drawGrid()
  }
  return !(status === 0xb0 && data2 === 0x00)
}

// -----------------------------------------------------------------------------

menuKey.drawGrid = function () {

  // Circle of Fifths

  display.setPad(1, 7, 0x05) // F
  display.setPad(2, 7, 0x05) // C
  display.setPad(3, 7, 0x05) // G
  display.setPad(4, 6, 0x05) // D
  display.setPad(4, 5, 0x05) // A
  display.setPad(4, 4, 0x05) // E
  display.setPad(3, 3, 0x05) // B
  display.setPad(2, 3, 0x05) // F# / Gb
  display.setPad(1, 3, 0x05) // C# / Db
  display.setPad(0, 4, 0x05) // G# / Ab
  display.setPad(0, 5, 0x05) // D# / Eb
  display.setPad(0, 6, 0x05) // A# / Bb

  // Current tonic

  switch (state.tonic) {
    case 0: // C
      display.setPad(2, 7, 0x1)
      break
    case 1: // C#
      display.setPad(1, 3, 0x1)
      break
    case 2: // D
      display.setPad(4, 6, 0x1)
      break
    case 3: // D#
      display.setPad(0, 5, 0x1)
      break
    case 4: // E
      display.setPad(4, 4, 0x1)
      break
    case 5: // F
      display.setPad(1, 7, 0x1)
      break
    case 6: // F#
      display.setPad(2, 3, 0x1)
      break
    case 7: // G
      display.setPad(3, 7, 0x1)
      break
    case 8: // G#
      display.setPad(0, 4, 0x1)
      break
    case 9: // A
      display.setPad(4, 5, 0x1)
      break
    case 10: // A#
      display.setPad(0, 6, 0x1)
      break
    case 11: // B
      display.setPad(3, 3, 0x1)
      break
  }

  // Current Scale

  display.setPad(0, 0, 0x03)
  display.setPad(1, 0, state.scale[ 1] ? 0x01 : 0x08)
  display.setPad(2, 0, state.scale[ 2] ? 0x01 : 0x08)
  display.setPad(3, 0, state.scale[ 3] ? 0x01 : 0x08)
  display.setPad(4, 0, state.scale[ 4] ? 0x01 : 0x08)
  display.setPad(0, 1, state.scale[ 5] ? 0x01 : 0x08)
  display.setPad(1, 1, state.scale[ 6] ? 0x01 : 0x08)
  display.setPad(2, 1, state.scale[ 7] ? 0x01 : 0x08)
  display.setPad(3, 1, state.scale[ 8] ? 0x01 : 0x08)
  display.setPad(4, 1, state.scale[ 9] ? 0x01 : 0x08)
  display.setPad(0, 2, state.scale[10] ? 0x01 : 0x08)
  display.setPad(1, 2, state.scale[11] ? 0x01 : 0x08)
  display.setPad(2, 2, 0x03)

  // Page of Scales

  for (var y = 0; y < 8; y++) {
    for (var x = 0; x < 2; x++) {
      if (scales[this.page][2 * y + x] != null) {
        var eq = true
        for (var i = 0; i < 12; i++) {
          if ((state.scale[i]) !== (scales[this.page][2 * y + x].notes.charAt(i) !== "_" )) {
            eq = false
          }
        }
        display.setPad(6 + x, 7 - y, eq ? 0x01 : 0x02)
      }
    }
  }

  // Current Page

  for (var i = 0; i < 8; i++) {
    display.setSceneButton(i, this.page === i ? 0x02 | 0x10 : 0x11)
  }

}

// -----------------------------------------------------------------------------
// Copyright (c) 2015-2016 - Laurent Moussault <moussault.laurent@gmail.com>
