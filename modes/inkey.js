// -----------------------------------------------------------------------------

function ModeInKey () {
  this.translation = newTranslationTable()
  this.originDegree = 0
  this.originOctave = 3
  dx = 1
  dy = 3
  this.keyColors = keyColorSchemes[0]
  this.upPressed = false
  this.downPressed = false
  this.leftPressed = false
  this.rightPressed = false
  this.nbDegrees = 0
  this.notePositions = new Array(12)
}

// -----------------------------------------------------------------------------

ModeInKey.prototype.enter = function () {
  menuSettings.submenus[1] = menuLayoutInKey
  display.clearSceneButtons(0x11)
  this.updateAndDraw()
}

// -----------------------------------------------------------------------------

ModeInKey.prototype.onMidi = function (status, data1, data2) {
  var h = false
  if (status === 0xb0) {
    var dx = state.getInKeyDeltaX()
    var dy = state.getInKeyDeltaY()
    switch (data1) {
      case 0x5b:
        if (data2 > 0) {
          this.upPressed = true
          if (launchpad.shifted) {
            this.originOctave = this.originOctave + 1
          } else if (this.downPressed) {
            this.originOctave = 3
            this.originDegree = 0
          } else {
            this.originOctave += Math.floor((this.originDegree + dy) / this.nbDegrees)
            this.originDegree = modulo(this.originDegree + dy, this.nbDegrees)
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
            this.originOctave = this.originOctave - 1
          } else if (this.upPressed) {
            this.originOctave = 3
            this.originDegree = 0
          } else {
            this.originOctave += Math.floor((this.originDegree - dy) / this.nbDegrees)
            this.originDegree = modulo(this.originDegree - dy, this.nbDegrees)
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
            // TODO
          } else if (this.rightPressed) {
            // TODO
            this.originOctave = 3
            this.originDegree = 0
          } else {
            this.originOctave += Math.floor((this.originDegree - dx) / this.nbDegrees)
            this.originDegree = modulo(this.originDegree - dx, this.nbDegrees)
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
            // TODO
          } else if (this.leftPressed) {
            // TODO
            this.originOctave = 3
            this.originDegree = 0
          } else {
            this.originOctave += Math.floor((this.originDegree + dx) / this.nbDegrees)
            this.originDegree = modulo(this.originDegree + dx, this.nbDegrees)
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

ModeInKey.prototype.updateAndDraw = function () {
  this.fillTranslation()
  launchpad.noteInput.setKeyTranslationTable(this.translation)
  this.drawGrid()
}

// -----------------------------------------------------------------------------

ModeInKey.prototype.fillTranslation = function () {
  for (var i = 0; i < 12; i++) {
    this.notePositions[i] = null
  }
  this.nbDegrees = 0
  var p = 0
  for (var i = 0; i < 12; i++) {
    if (state.scale[i] !== false) {
      this.nbDegrees++
      this.notePositions[this.nbDegrees - 1] = p
    }
    p++
  }
  for (var x = 0; x < 8; x++) {
    for (var y = 0; y < 8; y++) {
      var n = this.padNote(x, y)
      setPadTranslation(this.translation, x, y, n)
    }
  }
}

// -----------------------------------------------------------------------------

ModeInKey.prototype.drawGrid = function () {
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

ModeInKey.prototype.padNote = function (x, y) {
  //FIXME
  var dx = state.getInKeyDeltaX()
  var dy = state.getInKeyDeltaY()
  var deg = this.originDegree + x * dx + y * dy
  var o = this.originOctave + Math.floor(deg / this.nbDegrees)
  deg = deg % this.nbDegrees
  var n = this.notePositions[deg] + 12 * o
  if (n > 127 || n < 0) {
    n = -1
  }
  return n
}

// -----------------------------------------------------------------------------
// Copyright (c) 2015-2016 - Laurent Moussault <moussault.laurent@gmail.com>
