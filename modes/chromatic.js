// -----------------------------------------------------------------------------

function ModeChromatic () {
  this.translation = newTranslationTable()
  this.keyColors = keyColorSchemes[0]
  this.upPressed = false
  this.downPressed = false
  this.leftPressed = false
  this.rightPressed = false
}

// -----------------------------------------------------------------------------

ModeChromatic.prototype.enter = function () {
  menuSettings.submenus[1] =  menuLayoutChromatic
  display.clearSceneButtons(0x11)
  this.updateAndDraw()
}

// -----------------------------------------------------------------------------

ModeChromatic.prototype.onMidi = function (status, data1, data2) {
  var h = false
  if (status === 0xb0) {
    switch (data1) {
      case 0x5b:
        if (data2 > 0) {
          this.upPressed = true
          if (launchpad.shifted) {
            state.setChromaticOrigin (state.getChromaticOrigin() + state.getChromaticDeltaY())
          } else if (this.downPressed) {
            state.setChromaticOrigin (48 + state.tonic)
          } else {
            state.setChromaticOrigin (state.getChromaticOrigin() + 12)
          }
        } else {
          this.upPressed = false
        }
        h = true
        break
      case 0x5c:
        if (data2 > 0) {
          this.downPressed = true
          if (launchpad.shifted) {
            state.setChromaticOrigin (state.getChromaticOrigin() - state.getChromaticDeltaY())
          } else if (this.upPressed) {
            state.setChromaticOrigin (48 + state.tonic)
          } else {
            state.setChromaticOrigin (state.getChromaticOrigin() - 12)
          }
        } else {
          this.downPressed = false
        }
        h = true
        break
      case 0x5d:
        if (data2 > 0) {
          this.leftPressed = true
          if (launchpad.shifted) {
            state.setChromaticOrigin (state.getChromaticOrigin() - 1)
          } else if (this.rightPressed) {
            state.setChromaticOrigin (48)
          } else {
            state.setChromaticOrigin (state.getChromaticOrigin() - state.getChromaticDeltaX())
          }
        } else {
          this.leftPressed = false
        }
        h = true
        break
      case 0x5e:
        if (data2 > 0) {
          this.rightPressed = true
          if (launchpad.shifted) {
            state.setChromaticOrigin (state.getChromaticOrigin() + 1)
          } else if (this.leftPressed) {
            state.setChromaticOrigin (48)
          } else {
            state.setChromaticOrigin (state.getChromaticOrigin() + state.getChromaticDeltaX())
          }
        } else {
          this.rightPressed = false
        }
        h = true
        break
    }
    if (h) {
      this.updateAndDraw()
    }
  } else if (status === 0x90) {
    var x = display.padX(data1)
    var y = display.padY(data1)
    var n = this.padNote(x, y)
    var nn = modulo(n - state.tonic, 12)
    var no = Math.floor(n / 12)
    var ns = state.scale[nn]
    var c = 0x0a
    if (data2 > 0) {
      if (n === -1) {
        c = 0x00
      } else {
        c = colorPressedKey
      }
    } else {
      if (n === -1) {
        c = 0x00
      } else if (nn === 0) {
        c = this.keyColors[no][0]
      } else if (ns) {
        c = this.keyColors[no][1]
      } else {
        c = 0x00
      }
    }
    for (var x = 0; x < 8; x++) {
      for (var y = 0; y < 8; y++) {
        var xyn = this.padNote(x, y)
        if (xyn === n) {
          display.setPad(x, y, c)
        }
      }
    }
    h = true
  }

  return h
}

// -----------------------------------------------------------------------------

ModeChromatic.prototype.updateAndDraw = function () {
  this.fillTranslation()
  launchpad.noteInput.setKeyTranslationTable(this.translation)
  this.drawGrid()
}

// -----------------------------------------------------------------------------

ModeChromatic.prototype.fillTranslation = function () {
  for (var x = 0; x < 8; x++) {
    for (var y = 0; y < 8; y++) {
      var n = this.padNote(x, y)
      setPadTranslation(this.translation, x, y, n)
    }
  }
}

// -----------------------------------------------------------------------------

ModeChromatic.prototype.drawGrid = function () {
  for (var x = 0; x < 8; x++) {
    for (var y = 0; y < 8; y++) {
      var n = this.padNote(x, y)
      var nn = modulo(n - state.tonic, 12)
      var no = Math.floor(n / 12)
      var ns = state.scale[nn]
      if (n === -1) {
        display.setPad(x, y, 0x00)
      } else if (nn === 0) {
        display.setPad(x, y, this.keyColors[no][0])
      } else if (ns) {
        display.setPad(x, y, this.keyColors[no][1])
      } else {
        display.setPad(x, y, 0x00)
      }
    }
  }
}

// -----------------------------------------------------------------------------

ModeChromatic.prototype.padNote = function (x, y) {
  var n = state.getChromaticOrigin() + x * state.getChromaticDeltaX() + y * state.getChromaticDeltaY()
  if (n > 127 || n < 0) {
    n = -1
  }
  return n
}

// -----------------------------------------------------------------------------
// Copyright (c) 2015-2016 - Laurent Moussault <moussault.laurent@gmail.com>
