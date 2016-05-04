// -----------------------------------------------------------------------------

var state = {
}

// -----------------------------------------------------------------------------

state.init = function () {
  var ds = host.getDocumentState()

  this.version = ds.getNumberSetting("Version", "Global", 0, 255, 1, "", 1)
  this.version.hide()

  // Tonic
  this.tonic = 0
  this.tonicValue = ds.getEnumSetting("Tonic", "Global", enumTonic, enumTonic[0])
  this.tonicValue.addValueObserver(function (v) {
    state.tonic = enumTonic.indexOf(v)
    launchpad.enter()
  })

  // Scale
  this.scale = scaleMajor.slice()
  this.scaleValue = ds.getStringSetting("Scale", "Global", 12, "1_2_34_5_6_7")
  this.scaleValue.addValueObserver(function (s) {
    for (var i = 0; i < 12; i++) {
      var c = s.charAt(i)
      state.scale[i] = (c !== "_") && (c !== "")
    }
    launchpad.enter()
  })

  // Screen
  this.screen = 1
  this.screenValue = ds.getEnumSetting("Screen", "Global", enumScreen, enumScreen[1])
  this.screenValue.addValueObserver(function (n) {
    state.screen = enumScreen.indexOf(n)
    launchpad.enter()
  })

  this.screens = [{}, {}, {}, {}]

  for (var s = 1; s < 4; s++) {
    // Screen Mode
    this.screens[s].mode = s-1
    this.screens[s].modeValue = ds.getEnumSetting(
      "Mode",
      enumScreen[s] + " Screen",
      enumMode,
      enumMode[s-1]
    )
    this.screens[s].modeValue.addValueObserver((function (scr) {
      return function (n) {
        scr.mode = enumMode.indexOf(n)
        launchpad.enter()
      }
    } (this.screens[s])))

    // Chromatic Origin
    this.screens[s].chromaticOrigin = 48
    this.screens[s].chromaticOriginValue = ds.getNumberSetting(
      "C: Origin",
      enumScreen[s] + " Screen",
      0,
      127,
      1,
      "semitones",
      48
    )
    this.screens[s].chromaticOriginValue.addValueObserver(128, (function (scr) {
      return function (v) {
        scr.chromaticOrigin = v
        launchpad.enter()
      }
    } (this.screens[s])))
  }
}

// -----------------------------------------------------------------------------

const enumScreen = ["Session", "Note", "Device", "User"]

state.setScreen = function (s) {
  this.screenValue.set(enumScreen[s])
}

// -----------------------------------------------------------------------------

const enumTonic = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"]

state.setTonic = function (t) {
  this.tonicValue.set(enumTonic[t])
}

// -----------------------------------------------------------------------------

state.setScale = function(s) {
  this.scaleValue.set(s)
}

// -----------------------------------------------------------------------------

const enumMode = ["Chromatic", "Drum", "In Key", "Chords"]

state.setMode = function (m) {
  this.screens[this.screen].modeValue.set(enumMode[m])
}

// -----------------------------------------------------------------------------

state.setChromaticOrigin = function (v) {
  this.screens[this.screen].chromaticOriginValue.set(v, 128)
}

state.getChromaticOrigin = function () {
  return this.screens[this.screen].chromaticOrigin
}

// -----------------------------------------------------------------------------
// Copyright (c) 2015-2016 - Laurent Moussault <moussault.laurent@gmail.com>
