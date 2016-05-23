// -----------------------------------------------------------------------------

function ModeDrum () {
  this.widePads = false
  this.colors = drumColorSchemes[0]
  this.translation = newTranslationTable()
  this.origin = 36
}

// -----------------------------------------------------------------------------

ModeDrum.prototype.enter = function () {
  menuSettings.submenus[1] =  menuLayoutDrum
  display.clearSceneButtons(0x11)
  this.updateAndDraw()
}

// -----------------------------------------------------------------------------

ModeDrum.prototype.onMidi = function (status, data1, data2) {
  var h = false
  if (status === 0xb0 && data2 > 0) {
    switch (data1) {
      case 0x5b:
        if (this.widePads) {
          this.origin += 32
          this.origin = modulo(this.origin, 128)
        } else {
          this.origin = 36
        }
        h = true
        break
      case 0x5c:
        if (this.widePads) {
          this.origin -= 32
          this.origin = modulo(this.origin, 128)
        } else {
          this.origin = 36 + 64
        }
        h = true
        break
      case 0x5d:
        this.origin -= 16
        this.origin = modulo(this.origin, 128)
        h = true
        break
      case 0x5e:
        this.origin += 16
        this.origin = modulo(this.origin, 128)
        h = true
        break
    }
    if (h) {
      this.updateAndDraw()
    }
  } else if (status === 0x90) {
    h = true
    var x = display.padX(data1)
    var y = display.padY(data1)
    if (data2 > 0) {
      if (this.widePads) {
        x = 2 * Math.floor(x / 2)
        display.setPad(x, y, 0x0a)
        display.setPad(x + 1, y, 0x0a)
      } else {
        display.setPad(x, y, 0x0a)
      }
    } else {
      var n = this.padNote(x, y)
      if (n > -1) {
        n = modulo(n - 4, 128)
        var sq = 2 * Math.floor(n / 16) + Math.floor(n + n / 4) % 2
        if (this.widePads) {
          x = 2 * Math.floor(x / 2)
          display.setPad(x, y, this.colors[sq])
          display.setPad(x + 1, y, this.colors[sq])
        } else {
          display.setPad(x, y, this.colors[sq])
        }
      }
    }
  }
  return h
}

// -----------------------------------------------------------------------------

ModeDrum.prototype.updateAndDraw = function () {
  this.fillTranslation()
  launchpad.noteInput.setKeyTranslationTable(this.translation)
  this.drawGrid()
}

// -----------------------------------------------------------------------------

ModeDrum.prototype.fillTranslation = function () {
  for (var x = 0; x < 8; x++) {
    for (var y = 0; y < 8; y++) {
      var n = this.padNote(x, y)
      setPadTranslation(this.translation, x, y, n)
    }
  }
}

// -----------------------------------------------------------------------------

ModeDrum.prototype.drawGrid = function () {
  for (var y = 0; y < 8; ++y) {
    for (var x = 0; x < 8; ++x) {
      var n = this.padNote(x, y)
      if (n > -1) {
        n = modulo(n - 4, 128)
        var sq = 2 * Math.floor(n / 16) + Math.floor(n + n / 4) % 2
        display.setPad(x, y, this.colors[sq])
      } else {
        display.setPad(x, y, 0x00)
      }
    }
  }
}

// -----------------------------------------------------------------------------

ModeDrum.prototype.padNote = function (x, y) {
  var n = this.origin + 4 * y
  if (this.widePads) {
    x = Math.floor(x / 2)
  }
  if (x > 3) {
    x -= 4
    n += 32
  }
  n += x
  if (n > 127) {
    n -= 128
  } else if (n < 0) {
    n += 128
  }
  return n
}

// -----------------------------------------------------------------------------
// Copyright (c) 2015-2016 - Laurent Moussault <moussault.laurent@gmail.com>
