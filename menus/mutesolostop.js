// -----------------------------------------------------------------------------

var menuMuteSoloStop = {
  color: 0x03
}

// -----------------------------------------------------------------------------

menuMuteSoloStop.onMidi = function (status, data1, data2) {
  if (status === 0x90 && data2 > 0) {
  }

  return !(status === 0xb0 && data2 === 0x00)
}

// -----------------------------------------------------------------------------

menuMuteSoloStop.enter = function () {
  launchpad.mute()

  for (var x = 0; x < 8; ++x) {
    display.setPad(x, 1, 0x13)
    display.setPad(x, 0, 0x12)
  }
  display.clearSceneButtons(0x18)
  display.clearBottomButtons(0x18)
}

// -----------------------------------------------------------------------------
// Copyright (c) 2015-2016 - Laurent Moussault <moussault.laurent@gmail.com>
