// -----------------------------------------------------------------------------

var menuSettings = {
  color: 0x05,
  submenus: [menuMode, menuLayoutChromatic],
  submenu: menuMode
}

// -----------------------------------------------------------------------------

menuSettings.enter = function () {
  launchpad.mute()
  display.clearPads(0x0)
  display.clearSceneButtons(0x00)
  this.drawGrid()
}

// -----------------------------------------------------------------------------

menuSettings.onMidi = function (status, data1, data2) {
  if (status === 0xb0 && data2 > 0) {
    switch (data1) {
      case 0x59:
        this.submenu = this.submenus[0]
        break
      case 0x4f:
        this.submenu = this.submenus[1]
        break
    }
    display.clearPads(0x0)
    this.drawGrid()
    println(byteToHexString(data1))
  } else {
    return this.submenu.onMidi(status, data1, data2)
  }

  return !(status === 0xb0 && data2 === 0x00)
}

// -----------------------------------------------------------------------------

menuSettings.drawGrid = function () {
  display.setSceneButton(0,
    this.submenu === this.submenus[0] ? this.color | 0x10 : 0x11)
  display.setSceneButton(1,
    this.submenu === this.submenus[1] ? this.color | 0x10 : 0x11)
  this.submenu.drawGrid()
}

// -----------------------------------------------------------------------------
// Copyright (c) 2015-2016 - Laurent Moussault <moussault.laurent@gmail.com>
