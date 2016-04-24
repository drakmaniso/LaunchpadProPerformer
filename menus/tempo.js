// -----------------------------------------------------------------------------

var menuTempo = {
  color: 0x07
}

// -----------------------------------------------------------------------------

menuTempo.onMidi = function (status, data1, data2) {
  if (status === 0x90 && data2 > 0) {
  }

  return !(status === 0xb0 && data2 === 0x00)
}

// -----------------------------------------------------------------------------

menuTempo.enter = function () {
  launchpad.mute()

  display.clearPads(0x00)

  display.setPad(1, 7, this.color)
  display.setPad(0, 6, this.color)
  display.setPad(1, 6, this.color)
  display.setPad(1, 5, this.color)
  display.setPad(1, 4, this.color)
  display.setPad(1, 3, this.color)

  display.setPad(3, 7, this.color)
  display.setPad(4, 7, this.color)
  display.setPad(4, 6, this.color)
  display.setPad(3, 5, this.color)
  display.setPad(4, 5, this.color)
  display.setPad(3, 4, this.color)
  display.setPad(3, 3, this.color)
  display.setPad(4, 3, this.color)

  display.setPad(6, 7, this.color)
  display.setPad(7, 7, this.color)
  display.setPad(6, 6, this.color)
  display.setPad(7, 6, this.color)
  display.setPad(6, 5, this.color)
  display.setPad(7, 5, this.color)
  display.setPad(6, 4, this.color)
  display.setPad(7, 4, this.color)
  display.setPad(6, 3, this.color)
  display.setPad(7, 3, this.color)
}

// -----------------------------------------------------------------------------
// Copyright (c) 2015-2016 - Laurent Moussault <moussault.laurent@gmail.com>
