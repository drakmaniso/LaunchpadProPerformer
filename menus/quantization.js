// -----------------------------------------------------------------------------

var menuQuantization = {
}

// -----------------------------------------------------------------------------

menuQuantization.enter = function () {
  launchpad.mute()

  display.clearPads(0x00)

  display.setPad(1, 7, 0x1)
  display.setPad(0, 6, 0x1)
  display.setPad(1, 6, 0x1)
  display.setPad(1, 5, 0x1)
  display.setPad(1, 4, 0x1)
  display.setPad(1, 3, 0x1)

  display.setPad(3, 7, 0x1)
  display.setPad(4, 7, 0x1)
  display.setPad(3, 6, 0x1)
  display.setPad(3, 5, 0x1)
  display.setPad(4, 5, 0x1)
  display.setPad(3, 4, 0x1)
  display.setPad(4, 4, 0x1)
  display.setPad(3, 3, 0x1)
  display.setPad(4, 3, 0x1)
}

// -----------------------------------------------------------------------------

menuQuantization.onMidi = function (status, data1, data2) {
  if (status === 0x90 && data2 > 0) {
  }

  return !(status === 0xb0 && data1 === 0x28 && data2 === 0x00)
}

// -----------------------------------------------------------------------------
// Copyright (c) 2015-2016 - Laurent Moussault <moussault.laurent@gmail.com>
