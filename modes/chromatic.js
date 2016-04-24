// -----------------------------------------------------------------------------

function ModeChromatic () {
  this.layoutMenu = menuLayoutChromatic

  this.translation = newTranslationTable()
  this.origin = 48
  this.deltaX = 1
  this.deltaY = 5
  this.keyColors = keyColorSchemes[0]
  this.screenPressed = false
  this.upPressed = false
  this.downPressed = false
  this.leftPressed = false
  this.rightPressed = false
}

// -----------------------------------------------------------------------------

ModeChromatic.prototype.enter = function () {
  launchpad.screen.menus[3] = this.layoutMenu
  display.clearSceneButtons(0x11)
  this.updateAndDraw()
}

// -----------------------------------------------------------------------------

ModeChromatic.prototype.onMidi = function (status, data1, data2) {
  var h = false
  if (status == 0xb0) {
    switch (data1) {
      case 0x5b:
        if (data2 > 0) {
          this.upPressed = true
          if (this.screenPressed) {
            this.origin = this.origin + 12
          } else if (this.downPressed) {
            this.origin = 48 + launchpad.tonic
          } else {
            this.origin = this.origin + this.deltaY
          }
        } else {
          this.upPressed = false
        }
        h = true
        break
      case 0x5c:
        if (data2 > 0) {
          this.downPressed = true
          if (this.screenPressed) {
            this.origin = this.origin - 12
          } else if (this.upPressed) {
            this.origin = 48 + launchpad.tonic
          } else {
            this.origin = this.origin - this.deltaY
          }
        } else {
          this.downPressed = false
        }
        h = true
        break
      case 0x5d:
        if (data2 > 0) {
          this.leftPressed = true
          if (this.screenPressed) {
            this.origin = this.origin - 1
          } else if (this.rightPressed) {
            this.origin = 48
          } else {
            this.origin = this.origin - this.deltaX
          }
        } else {
          this.leftPressed = false
        }
        h = true
        break
      case 0x5e:
        if (data2 > 0) {
          this.rightPressed = true
          if (this.screenPressed) {
            this.origin = this.origin + 1
          } else if (this.leftPressed) {
            this.origin = 48
          } else {
            this.origin = this.origin + this.deltaX
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
  } else if (status == 0x90) {
    var x = display.padX(data1)
    var y = display.padY(data1)
    var n = this.padNote(x, y)
    var nn = (n - launchpad.tonic) % 12
    var no = Math.floor(n / 12)
    var ns = launchpad.scale.notes[nn]
    var c = 0x0a
    if (data2 > 0) {
      if (n == -1) {
        c = 0x00
      } else {
        c = colorPressedKey
      }
    } else {
      if (n == -1) {
        c = 0x00
      } else if (ns === 0) {
        c = this.keyColors[no][ns]
      } else if (ns) {
        c = this.keyColors[no][ns]
      } else {
        c = 0x00
      }
    }
    for (var x = 0; x < 8; x++) {
      for (var y = 0; y < 8; y++) {
        var xyn = this.padNote(x, y)
        if (xyn == n) {
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
      var nn = (n - launchpad.tonic) % 12
      var no = Math.floor(n / 12)
      var ns = launchpad.scale.notes[nn]
      if (n == -1) {
        display.setPad(x, y, 0x00)
      } else if (ns === 0) {
        display.setPad(x, y, this.keyColors[no][ns])
      } else if (ns) {
        display.setPad(x, y, this.keyColors[no][ns])
      } else {
        display.setPad(x, y, 0x00)
      }
    }
  }
}

// -----------------------------------------------------------------------------

ModeChromatic.prototype.padNote = function (x, y) {
  var n = this.origin + x * this.deltaX + y * this.deltaY
  if (n > 127 || n < 0) {
    n = -1
  }
  return n
}

// -----------------------------------------------------------------------------
// Copyright (c) 2015-2016 - Laurent Moussault <moussault.laurent@gmail.com>
