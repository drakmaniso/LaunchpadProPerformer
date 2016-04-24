// -----------------------------------------------------------------------------

var menuClip = {
  color: 0x02
}

// -----------------------------------------------------------------------------

menuClip.onMidi = function (status, data1, data2) {
  if (status === 0x90 && data2 > 0) {
  }

  return !(status === 0xb0 && data2 === 0x00)
}

// -----------------------------------------------------------------------------

menuClip.enter = function () {
  launchpad.mute()

  display.clearPads(0x00)
}

// -----------------------------------------------------------------------------
// Copyright (c) 2015-2016 - Laurent Moussault <moussault.laurent@gmail.com>
