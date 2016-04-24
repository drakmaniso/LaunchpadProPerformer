// -----------------------------------------------------------------------------

function ScreenSession () {
}

// -----------------------------------------------------------------------------

ScreenSession.prototype.enter = function () {
  launchpad.mute()

  launchpad.unbindMenus()
  launchpad.bindMenu(1, menuClip)
  launchpad.bindMenu(3, menuTempo)
  launchpad.bindMenu(4, menuQuantization)
  launchpad.bindMenu(6, menuMuteSoloStop)

  display.clearSceneButtons(0x11)
  display.clearBottomButtons(0x00)

  display.clearPads(0x00)

  // d.setPad(0, 7, 0x02)
  // d.setPad(0, 6, 0x02 | BLINKING_COLOR)
  // d.setPad(0, 5, 0x02)
  // d.setPad(0, 4, 0x02)

  // d.setPad(1, 7, 0x03)
  // d.setPad(1, 6, 0x03 | BLINKING_COLOR)
  // d.setPad(1, 5, 0x03)
  // d.setPad(1, 4, 0x03)
  // d.setPad(1, 3, 0x03)

  // d.setPad(2, 7, 0x04 | BLINKING_COLOR)
  // d.setPad(2, 6, 0x04)
  // d.setPad(2, 5, 0x04)

  // d.setPad(3, 6, 0x05)
  // d.setPad(3, 5, 0x05)
  // d.setPad(3, 4, 0x05)
  // d.setPad(3, 2, 0x05)

  // d.setPad(4, 6, 0x06)
  // d.setPad(4, 5, 0x06)
  // d.setPad(4, 4, 0x06 | BLINKING_COLOR)
  // d.setPad(4, 3, 0x06)

  // d.setPad(5, 7, 0x07)
  // d.setPad(5, 6, 0x07)
  // d.setPad(5, 5, 0x07)

  // d.setPad(6, 6, 0x08)
  // d.setPad(6, 5, 0x08)
  // d.setPad(6, 4, 0x08)

  // d.setPad(7, 5, 0x09)
  // d.setPad(7, 4, 0x09)
  // d.setPad(7, 3, 0x09)

// tracks.getClipLauncherScenes().setIndication(true)
// tracks.scrollChannelsDown()
// act.selectFirst()
}

// -----------------------------------------------------------------------------

ScreenSession.prototype.onMidi = function (status, data1, data2) {
  var h

  if (status === 0xb0) {
    switch (data1) {
      case 0x5b:
        if (data2 > 0) {
          bitwig.trackBank.scrollScenesUp()
        }
        break
      case 0x5c:
        if (data2 > 0) {
          bitwig.trackBank.scrollScenesDown()
        }
        break
      case 0x5d:
        if (data2 > 0) {
          bitwig.trackBank.scrollChannelsUp()
        }
        break
      case 0x5e:
        if (data2 > 0) {
          bitwig.trackBank.scrollChannelsDown()
        }
        break
      case 0x14:
        // if (data2 > 0) {
        //   for (var x = 0; x < 8; ++x) {
        //     display.setPad(x, 1, 0x13)
        //     display.setPad(x, 0, 0x12)
        //   }
        //   display.clearSceneButtons(0x18)
        //   display.clearBottomButtons(0x18)
        // } else {
        //   for (var x = 0; x < 8; ++x) {
        //     display.setPad(x, 1, 0x00)
        //     display.setPad(x, 0, 0x00)
        //   }
        //   display.clearSceneButtons(0x11)
        //   display.clearBottomButtons(0x00)
        // }
        // h = true
        break
    }
  }

  return h
}

// -----------------------------------------------------------------------------
// Copyright (c) 2015-2016 - Laurent Moussault <moussault.laurent@gmail.com>
